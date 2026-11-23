import { screenFrame } from "../shared.js";

export function mountCompletion(root) {
  root.innerHTML = screenFrame("09 · Demo complete", "The rescue story continues.", "You have reached the end of this short preview of the Polar Explorers tour.", `
    <section class="panel finish-card"><div class="finish-mark" aria-hidden="true">✦</div><p class="tag">DEMO COMPLETE</p><h2>Good work, explorers.</h2><p>You received the distress email, contacted Dispatch, explored Wanny's inventory, tuned the radio, intercepted the hackers, spoke with Amundsen, and explored his expeditions and compass riddle.</p><button class="button button-secondary" type="button" data-action="restart-demo">Start again</button></section>`, "");
  root.querySelector('[data-action="restart-demo"]').addEventListener("click", () => window.location.reload());
}
