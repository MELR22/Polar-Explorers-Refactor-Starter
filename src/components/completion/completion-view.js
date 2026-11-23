import { screenFrame } from "../shared.js";

export function mountCompletion(root) {
  root.innerHTML = screenFrame("09 · Demo complete", "The story continues.", "You have reached the end of this short preview of the Polar Explorers tour. Have a look at our website to find out more.", `
    <section class="panel finish-card"><div class="finish-mark" aria-hidden="true">✦</div><p class="tag">DEMO COMPLETE</p><h2>Good work, explorers.</h2><p>Well done, you saved the crew! Or did you? Well, at least now you where to start...</p>.</p><button class="button button-secondary" type="button" data-action="restart-demo">Start again</button></section>`, "");
  root.querySelector('[data-action="restart-demo"]').addEventListener("click", () => window.location.reload());
}
