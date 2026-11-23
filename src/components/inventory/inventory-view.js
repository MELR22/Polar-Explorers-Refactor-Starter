import { bubble, escapeHtml, screenFrame } from "../shared.js";

const letters = ["F", "O", "X"];

export function mountInventory(root, { state, content }) {
  const { wannyMessages, wannyArtifacts } = content;
  const details = [wannyMessages[0], wannyMessages[1], wannyMessages[2], wannyMessages[4], wannyMessages[5], wannyMessages[6]].filter(Boolean);
  state.wannySolvedArtifacts ??= [];
  state.inventorySelection ??= wannyArtifacts[0]?.id;
  state.wannyCaseStage ??= "case";

  function render() {
    const selected = wannyArtifacts.find(item => item.id === state.inventorySelection) ?? wannyArtifacts[0];
    const solved = state.wannySolvedArtifacts;
    const board = letters.map((letter, index) => {
      const found = solved.includes(["licence", "dogs", "book"][index]);
      return `<span class="case-letter ${found ? "found" : ""}">${found ? letter : "?"}</span>`;
    }).join("");
    const itemVisual = item => item.image
      ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">`
      : `<div class="book-object" aria-label="A page from Wanny's book"><span>WANNY WOLDSTAD · FIELD NOTES</span><p>“Bear steak, bear cakes and bear-meat soup. Slowly, one almost became a bear.”</p><strong>${escapeHtml(item.evidence || "APPENDIX X")}</strong></div>`;

    let caseContent = "";
    if (state.wannyCaseStage === "case") {
      caseContent = `
        <div class="chat-stream small-chat">${details.map(message => bubble(message.text)).join("")}<div class="attachment-button">Wanny_Field_Case · added to inventory after the call</div></div>
        <div class="wanny-case-intro"><div><div class="tag">WANNY'S FIELD CASE · 3 OBJECTS</div><p>Inspect each object. Wanny left one letter hidden in each detail.</p></div><div class="case-letter-board" aria-label="Letters found: ${solved.length} of 3">${board}</div></div>
        <div class="inventory-grid">${wannyArtifacts.map(item => `<button class="inventory-item" type="button" data-item-id="${escapeHtml(item.id)}" aria-pressed="${item.id === selected.id}">${itemVisual(item)}<strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.caption)}</small><em>${solved.includes(item.id) ? "LETTER FOUND" : "OPEN CASE ITEM →"}</em></button>`).join("")}</div>
        ${selected ? `<article class="item-detail">${itemVisual(selected)}<div><span class="micro">${escapeHtml(selected.caption)}</span><h3>${escapeHtml(selected.title)}</h3><p>${escapeHtml(selected.text)}</p><button class="button button-secondary" type="button" data-action="examine-item">Examine this object</button></div></article>` : ""}
      `;
    } else if (state.wannyCaseStage === "evidence") {
      const item = selected;
      caseContent = `
        <section class="case-evidence">
          <button class="button button-secondary" type="button" data-action="back-to-case">← Back to the field case</button>
          <p class="tag">OBSERVATION TEST · ${escapeHtml(item.title)}</p>
          <h2>Which letter is hidden in this object?</h2>
          <div class="case-evidence-object">${itemVisual(item)}<span class="case-evidence-mark">${escapeHtml(item.evidence || "APPENDIX X")}</span></div>
          <div class="case-answer-options" role="group" aria-label="Choose the letter">${item.choices.map(letter => `<button class="button button-secondary" type="button" data-letter="${letter}">${letter}</button>`).join("")}</div>
          <p class="micro" id="case-feedback" aria-live="polite">Look closely at the markings and choose a letter.</p>
        </section>
      `;
    } else if (state.wannyCaseStage === "fox") {
      caseContent = `
        <section class="case-riddle">
          <div class="case-letter-board case-letter-board-large">${board}</div>
          <p class="tag">WANNY'S CASE · WORD DISCOVERED</p>
          <h2>Which animal will lead you to the right frequency?</h2>
          <p>The three letters from Wanny's objects form the name of an Arctic animal.</p>
          <form id="fox-answer-form" class="case-answer-form"><label for="fox-answer">Enter the animal</label><div><input id="fox-answer" name="answer" autocomplete="off" placeholder="Animal name" required><button class="button" type="submit">Check</button></div></form>
          <p class="micro" id="fox-feedback" aria-live="polite">Use the letters in the order shown.</p>
        </section>
      `;
    } else if (state.wannyCaseStage === "frequency") {
      caseContent = `
        <section class="case-riddle">
          <p class="tag">ARCTIC FOX · TRANSMISSION CLUE</p>
          <h2>What frequency did the fox path reveal?</h2>
          <p>Follow the fox's trail across the original maze and enter the frequency at its endpoint.</p>
          <img class="wanny-frequency-maze" src="assets/images/Labyrinth_Wanny_Animals.jpg" alt="Animal tracks pass through a maze and connect to possible radio frequencies">
          <form id="frequency-answer-form" class="case-answer-form"><label for="frequency-answer">Frequency</label><div><input id="frequency-answer" name="answer" autocomplete="off" placeholder="e.g. 111 GHz" required><button class="button" type="submit">Check frequency</button></div></form>
          <p class="micro" id="frequency-feedback" aria-live="polite">Enter the frequency from Wanny's riddle.</p>
        </section>
      `;
    } else {
      caseContent = `
        <section class="case-riddle case-riddle-complete">
          <p class="finish-mark">✓</p><p class="tag">FREQUENCY RECORDED</p><h2>111 GHz</h2>
          <p>The Arctic fox clue revealed the frequency. Wanny's field case is complete.</p>
        </section>
      `;
    }

    root.innerHTML = screenFrame("04 · Wanny & inventory", "Wanny's field case.", "Her call added three personal objects to the inventory. Examine them to uncover the clue to the Arctic frequency.", `
      <section class="panel surface wanny-inventory-panel">
        ${caseContent}
        <p class="micro inventory-frequency-note">DEMO ROUTE · You can continue at any time.</p>
      </section>`, "Continue to hackers →");
  }

  function setFeedback(selector, text, correct = false) {
    const feedback = root.querySelector(selector);
    if (feedback) {
      feedback.textContent = text;
      feedback.classList.toggle("correct", correct);
      feedback.classList.toggle("wrong", !correct);
    }
  }

  render();
  root.addEventListener("click", event => {
    const itemButton = event.target.closest("button[data-item-id]");
    if (itemButton) {
      state.inventorySelection = itemButton.dataset.itemId;
      render();
      return;
    }
    if (event.target.closest('[data-action="examine-item"]')) {
      state.wannyCaseStage = "evidence";
      render();
      return;
    }
    if (event.target.closest('[data-action="back-to-case"]')) {
      state.wannyCaseStage = "case";
      render();
      return;
    }
    const chosenLetter = event.target.closest("button[data-letter]")?.dataset.letter;
    if (chosenLetter) {
      const item = wannyArtifacts.find(artifact => artifact.id === state.inventorySelection);
      if (chosenLetter === item.letter) {
        if (!state.wannySolvedArtifacts.includes(item.id)) state.wannySolvedArtifacts.push(item.id);
        state.wannyCaseStage = state.wannySolvedArtifacts.length === wannyArtifacts.length ? "fox" : "case";
        render();
      } else {
        setFeedback("#case-feedback", "Not quite. Look closely at the object and try again.");
      }
    }
  });

  root.addEventListener("submit", event => {
    if (event.target.id === "fox-answer-form") {
      event.preventDefault();
      const answer = new FormData(event.target).get("answer").trim().toLowerCase();
      if (answer === "fox" || answer === "arctic fox") {
        state.wannyCaseStage = "frequency";
        render();
      } else {
        setFeedback("#fox-feedback", "That animal does not match the letters. Try again.");
      }
    }
    if (event.target.id === "frequency-answer-form") {
      event.preventDefault();
      const answer = new FormData(event.target).get("answer").replace(/\s+/g, "").toLowerCase();
      if (answer === "111" || answer === "111ghz") {
        state.wannyFrequency = "111 GHz";
        state.wannyCaseStage = "frequency-found";
        render();
      } else {
        setFeedback("#frequency-feedback", "Wrong frequency. Check the fox path and try again.");
      }
    }
  });
}
