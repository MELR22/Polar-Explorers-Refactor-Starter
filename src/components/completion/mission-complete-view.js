import { screenFrame } from "../shared.js";

const routePoints = [
    [69.653077, 18.962380],
    [69.653163, 18.962062],
    [69.652848, 18.961464],
    [69.652833, 18.961461],
    [69.652743, 18.961287],
    [69.652735, 18.961219],
    [69.652466, 18.960755],
    [69.652343, 18.960573],
    [69.651455, 18.959629],
    [69.651498, 18.959315],
    [69.651300, 18.959090],
    [69.651332, 18.958974]
];

function loadLeaflet() {
    if (window.L) return Promise.resolve();

    if (window.leafletLoadPromise) return window.leafletLoadPromise;

    if (!document.querySelector("#leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.append(link);
    }

    window.leafletLoadPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.append(script);
    });

    return window.leafletLoadPromise;
}

export function mountMissionComplete(root) {
    root.innerHTML = screenFrame(
        "04 · First objective complete",
        "What's next?",
        "Based on Wanny’s notes, you successfully make contact with the crew. Your first objective is complete. After each objective, this screen shows your progress and next location. Click Continue to map to see the suggested route to your next stop.",
        `
      <section class="mission-success" id="mission-success">
        <div class="mission-success-check" aria-hidden="true">✓</div>
        <h3>MISSION COMPLETE</h3>

        <div class="mission-discovery">
          <span>CONTACT ESTABLISHED WITH</span>
          <strong>THE CREW</strong>
        </div>

        <p class="mission-progress-label">OBJECTIVE 1 OF 4 COMPLETE</p>
        <div
          class="mission-progress-track"
          role="progressbar"
          aria-label="Mission progress"
          aria-valuemin="0"
          aria-valuemax="4"
          aria-valuenow="1">
          <span></span>
        </div>

        <div class="mission-destination">
          <span class="mission-destination-label">YOUR NEXT DESTINATION</span>
          <strong>📍 Stortorget</strong>
          <span>69.651332, 18.958974</span>
        </div>

        <p class="mission-instruction">
          Continue to the map to see the route.
        </p>

        <button class="button mission-button" type="button" data-open-mission-map>
          Continue to map
        </button>
      </section>

      <section class="mission-map-screen" id="mission-map-screen" hidden>
        <header class="mission-map-header">
          <h2>Expedition Map</h2>
        </header>

        <p class="mission-map-destination">
          STATION 3 → STATION 4<br>
          Wanny Woldstad to Stortorget
        </p>

        <div class="mission-map-frame">
          <div id="mission-leaflet-map" aria-label="Walking route to Stortorget"></div>
        </div>

        <p class="mission-map-caption">Next destination: Stortorget</p>

        <button class="button mission-button" type="button" data-action="next">
          Continue to Mission
        </button>

        <p class="mission-map-error" id="mission-map-error" role="status" hidden>
          The map could not be loaded. Check your internet connection and try again.
        </p>
      </section>
    `,
        ""
    );

    const summary = root.querySelector("#mission-success");
    const mapScreen = root.querySelector("#mission-map-screen");
    const mapError = root.querySelector("#mission-map-error");
    let map;

    root.querySelector("[data-open-mission-map]").addEventListener("click", async () => {
        summary.hidden = true;
        mapScreen.hidden = false;

        try {
            await loadLeaflet();

            if (!map) {
                map = window.L.map(root.querySelector("#mission-leaflet-map"), {
                    zoomControl: true
                });

                window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    maxZoom: 19,
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                const route = window.L.polyline(routePoints, {
                    color: "#00b894",
                    weight: 6,
                    opacity: 0.95,
                    lineCap: "round",
                    lineJoin: "round"
                }).addTo(map);

                window.L.circleMarker(routePoints[0], {
                    radius: 7,
                    color: "#ffffff",
                    weight: 3,
                    fillColor: "#d97736",
                    fillOpacity: 1
                }).addTo(map).bindTooltip("Station 3 · Wanny Woldstad");

                window.L.circleMarker(routePoints.at(-1), {
                    radius: 8,
                    color: "#ffffff",
                    weight: 3,
                    fillColor: "#087f79",
                    fillOpacity: 1
                }).addTo(map).bindTooltip("Station 4 · Stortorget");

                map.fitBounds(route.getBounds(), { padding: [20, 20] });
            }

            requestAnimationFrame(() => map.invalidateSize());
        } catch (error) {
            console.error("Could not load the mission map:", error);
            mapError.hidden = false;
        }
    });
}