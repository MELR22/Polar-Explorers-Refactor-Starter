import { escapeHtml, screenFrame } from "../../../components/shared.js";

export function mountRiddle(root, { state, content, playAudio }) {
  const { compassRiddle: riddle } = content;
  const cardsById = Object.fromEntries(riddle.cards.map(card => [card.id, card]));
  let order = [...(state.expeditionOrder || riddle.startingOrder)];
  let solved = order.join(",") === riddle.correctOrder.join(",");

  const render = () => {
    const cardMarkup = order.map((id, index) => {
      const card = cardsById[id];
      return `<article class="expedition-riddle-card" data-expedition-id="${escapeHtml(id)}" aria-grabbed="false">
        <button class="expedition-drag-handle" type="button" aria-label="Drag ${escapeHtml(card.ship)} to reorder" title="Drag to reorder">⠿</button>
        <span class="expedition-order" aria-hidden="true">${index + 1}</span>
        <img src="${escapeHtml(card.image)}" alt="${escapeHtml(card.ship)} expedition">
        <div class="expedition-card-copy">
          <strong>${escapeHtml(card.ship)}</strong>
          <span>${escapeHtml(card.title)}</span>
          <small>${escapeHtml(card.route)}</small>
        </div>
        <span class="expedition-code" aria-label="Code ${card.code}">${card.code.split("").map((digit, digitIndex) => `<i style="--digit-index:${digitIndex}">${digit}</i>`).join("")}</span>
      </article>`;
    }).join("");

    const code = order.map(id => cardsById[id].code).join("");
    const animatedDigits = (digits, offset = 0) => digits.split("").map((digit, index) => `<span class="coordinate-digit" style="--digit-index:${offset + index}">${digit}</span>`).join("");
    const coordinateMarkup = solved
      ? `<div class="coordinate-result" aria-label="Coordinates 71.22 North, 11.15 West">
          <span class="coordinate-label">SAFETY DEPOT COORDINATES</span>
          <strong>${animatedDigits(code.slice(0, 2), 0)}<i>.</i>${animatedDigits(code.slice(2, 4), 2)}<span>N</span></strong>
          <b aria-hidden="true">·</b>
          <strong>${animatedDigits(code.slice(4, 6), 4)}<i>.</i>${animatedDigits(code.slice(6, 8), 6)}<span>W</span></strong>
        </div>`
      : `<div class="coordinate-result coordinate-hidden" aria-live="polite">The card codes will reveal the coordinates.</div>`;

    root.innerHTML = screenFrame("08 · Simplified expedition riddle", riddle.title, riddle.prompt, `
      <section class="expedition-riddle panel" aria-label="Sort Amundsen's expeditions">
        <div class="expedition-riddle-heading">
          <span class="tag">FIELD NOTES · EXPEDITION CODES</span>
          <p>${escapeHtml(riddle.instruction)}</p>
        </div>
        <div class="expedition-sort-list ${solved ? "is-solved" : ""}" aria-label="Expeditions, draggable to reorder">${cardMarkup}</div>
        <div class="coordinate-area ${solved ? "is-solved" : ""}" aria-live="polite">
          ${coordinateMarkup}
          <p class="riddle-feedback">${solved ? "Order confirmed. The codes reveal the rescue coordinates." : "Arrange the four journeys from earliest to latest."}</p>
        </div>
      </section>`, "Finish demo →");
  };

  const updateOrder = (fromId, toId, placeAfter = false) => {
    if (!fromId || !toId || fromId === toId) return;
    const fromIndex = order.indexOf(fromId);
    const toIndex = order.indexOf(toId);
    if (fromIndex < 0 || toIndex < 0) return;
    const [moved] = order.splice(fromIndex, 1);
    const targetIndex = order.indexOf(toId);
    order.splice(targetIndex + (placeAfter ? 1 : 0), 0, moved);
    state.expeditionOrder = [...order];
    const list = root.querySelector(".expedition-sort-list");
    const orderedCards = order.map(id => list.querySelector(`[data-expedition-id="${id}"]`));
    orderedCards.forEach(card => list.append(card));
  };

  render();

  let draggingId = null;
  let pointerId = null;
  root.addEventListener("pointerdown", event => {
    const handle = event.target.closest(".expedition-drag-handle");
    if (!handle) return;
    const card = handle.closest("[data-expedition-id]");
    draggingId = card.dataset.expeditionId;
    pointerId = event.pointerId;
    card.classList.add("is-dragging");
    card.setAttribute("aria-grabbed", "true");
    handle.setPointerCapture?.(event.pointerId);
  });

  root.addEventListener("pointermove", event => {
    if (!draggingId || event.pointerId !== pointerId) return;
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest(".expedition-riddle-card");
    if (!target || target.dataset.expeditionId === draggingId) return;
    const rect = target.getBoundingClientRect();
    updateOrder(draggingId, target.dataset.expeditionId, event.clientY > rect.top + rect.height / 2);
  });

  const finishDrag = event => {
    if (!draggingId || (event.pointerId !== undefined && event.pointerId !== pointerId)) return;

    root.querySelector(".is-dragging")?.classList.remove("is-dragging");
    root.querySelector("[aria-grabbed='true']")?.setAttribute("aria-grabbed", "false");
    draggingId = null;
    pointerId = null;

    const wasSolved = solved;
    solved = order.join(",") === riddle.correctOrder.join(",");
    render();

    if (solved && !wasSolved) {
      playAudio?.("assets/audio/ship_horn.mp3");
    }
  };
  root.addEventListener("pointerup", finishDrag);
  root.addEventListener("pointercancel", finishDrag);
}
