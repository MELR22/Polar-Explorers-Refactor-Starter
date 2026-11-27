import { escapeHtml, screenFrame } from "../../../components/shared.js";

const ATLAS = "assets/images/Amundsen/amundsen-atlas.svg";
const OVERLAY_PATH = "assets/images/Amundsen/amundsen-";

export function mountMap(root, { state, content }) {
  const { expeditions } = content;
  let focusedId = null;
  let activeStop = -1;

  root.innerHTML = screenFrame(
    "07 · Inventory",
    "Amundsen Expedition Atlas",
    "Besides riddles that use the surrounding environment, some require players to use objects from the inventory. These objects reveal something about the explorer or the story in an engaging way. In this case, the map shows the routes of Amundsen’s main expeditions and gives a brief overview of what happened on each one. Remember them well...",
    `
      <div class="amundsen-map-ui">
        <header class="amundsen-map-intro">
          <h2 id="amundsen-map-heading">Amundsen’s Expeditions</h2>
          <p id="amundsen-map-description">
            Roald Amundsen is one of Norway’s greatest explorers. Select a map pin to explore one of his four main expeditions.
          </p>
        </header>

        <div class="amundsen-map-viewer">
          <div class="amundsen-map-world" id="amundsen-map-world">
            <img class="amundsen-atlas-image" src="${ATLAS}"
              alt="Illustrated atlas of Roald Amundsen’s expeditions">

            <img class="amundsen-route-overlay" id="amundsen-route-overlay"
              alt="" aria-hidden="true" hidden>

            ${Object.entries(expeditions).map(([id, expedition]) => `
              <button class="amundsen-map-pin" type="button"
                data-expedition="${id}"
                style="left:${expedition.pin[0]}%;top:${expedition.pin[1]}%"
                aria-label="Explore the ${escapeHtml(expedition.name)} expedition">
                <span aria-hidden="true">📍</span>
                <span class="amundsen-pin-label">${escapeHtml(expedition.name)}</span>
              </button>
            `).join("")}
          </div>

          <button
            class="amundsen-map-return"
            type="button"
            id="amundsen-map-return"
            aria-label="Back to all expeditions"
            title="Back to all expeditions"
            hidden
          >
            <span aria-hidden="true">←</span>
          </button>
        </div>

        <section class="amundsen-map-notes" id="amundsen-map-notes"
          aria-live="polite">
          <p class="amundsen-map-hint">Tap a pin to explore an expedition.</p>
        </section>
      </div>
    `,
    "Continue demo →"
  );

  const world = root.querySelector("#amundsen-map-world");
  const routeOverlay = root.querySelector("#amundsen-route-overlay");
  const returnButton = root.querySelector("#amundsen-map-return");
  const notes = root.querySelector("#amundsen-map-notes");
  const heading = root.querySelector("#amundsen-map-heading");
  const description = root.querySelector("#amundsen-map-description");

  function setEmphasizedText(element, text) {
    element.replaceChildren(...text.split("*").map((part, index) => {
      if (index % 2 === 0) return document.createTextNode(part);
      const emphasis = document.createElement("em");
      emphasis.textContent = part;
      return emphasis;
    }));
  }

  function selectStop(index, timeline, entry) {
    const expedition = expeditions[focusedId];
    const stop = expedition.stops[index];
    if (!stop) return;

    activeStop = index;

    const scale = stop.zoom ?? 2.15;
    const offset = point =>
      Math.max(100 * (1 - scale), Math.min(0, 50 - point * scale));

    world.style.transform =
      `translate(${offset(stop.x)}%, ${offset(stop.y)}%) scale(${scale})`;

    timeline.querySelectorAll("button").forEach((button, buttonIndex) => {
      button.setAttribute("aria-pressed", String(buttonIndex === index));
    });

    entry.querySelector("h3").textContent = stop.name;
    setEmphasizedText(entry.querySelector("p"), stop.text);
  }

  function openExpedition(id) {
    const expedition = expeditions[id];
    if (!expedition) return;

    focusedId = id;
    activeStop = -1;

    heading.textContent = `${expedition.introTitle} · ${expedition.dates}`;
    setEmphasizedText(description, expedition.intro);

    routeOverlay.src = `${OVERLAY_PATH}${expedition.overlay}-overlay.svg`;
    routeOverlay.hidden = false;
    routeOverlay.onerror = () => {
      notes.innerHTML =
        '<p class="amundsen-map-hint">The route overlay could not load. Check that the Amundsen overlay files are in assets/images/Amundsen/.</p>';
    };

    root.querySelectorAll(".amundsen-map-pin").forEach(pin => {
      pin.hidden = true;
    });
    returnButton.hidden = false;

    const hint = document.createElement("p");
    hint.className = "amundsen-map-hint";
    hint.textContent = "Tap a stop along the timeline.";

    const timeline = document.createElement("div");
    timeline.className = "amundsen-map-timeline";
    timeline.setAttribute("role", "group");
    timeline.setAttribute("aria-label", `${expedition.name} expedition timeline`);

    expedition.stops.forEach((stop, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", `Stop ${index + 1}: ${stop.name}`);
      button.setAttribute("aria-pressed", "false");
      button.innerHTML = "<span></span>";
      button.addEventListener("click", () => {
        selectStop(index, timeline, entry);
      });
      timeline.append(button);
    });

    const entry = document.createElement("article");
    entry.className = "amundsen-map-entry";
    entry.innerHTML = "<h3></h3><p></p>";

    notes.replaceChildren(hint, timeline, entry);

    requestAnimationFrame(() => {
      selectStop(0, timeline, entry);
      timeline.querySelector("button")?.setAttribute("aria-pressed", "true");
    });
  }

  function showOverview() {
    focusedId = null;
    activeStop = -1;
    world.style.transform = "translate(0%, 0%) scale(1)";
    routeOverlay.hidden = true;
    routeOverlay.removeAttribute("src");
    returnButton.hidden = true;

    root.querySelectorAll(".amundsen-map-pin").forEach(pin => {
      pin.hidden = false;
    });

    heading.textContent = "Amundsen’s Expeditions";
    description.textContent =
      "Roald Amundsen is one of Norway’s greatest explorers. Select a map pin to explore one of his four main expeditions.";
    notes.innerHTML =
      '<p class="amundsen-map-hint">Tap a pin to explore an expedition.</p>';
  }

  root.addEventListener("click", event => {
    const pin = event.target.closest("[data-expedition]");
    if (pin) {
      openExpedition(pin.dataset.expedition);
      return;
    }

    if (event.target.closest("#amundsen-map-return")) {
      showOverview();
    }
  });

}
