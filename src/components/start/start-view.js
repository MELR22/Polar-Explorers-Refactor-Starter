import { screenFrame } from "../shared.js";

export function mountStart(root) {
    root.innerHTML = screenFrame(
        "WELCOME",
        "Start your mission",
        "This demo tour contains a selection of puzzles and other game elements from the Polar Explorers tour to give you an impression of the game. No need to go outside, you can play right from your desk. Press the button below to start the game.",
        `
      <section class="panel start-card">
        <h2>Polar Explorers</h2>
        <h3>demo tour</h3>
      </section>
    `,
        "Start demo →"
    );
}