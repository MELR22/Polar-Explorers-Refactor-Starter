import { screenFrame } from "../shared.js";

export function mountEmail(root, { state }) {
  function render() {
    const email = state.emailOpen ? `
      <div class="mail-subject">
        <h2>URGENT: Arctic distress signal</h2>
        <h3>FROM: Arctic Rescue Dispatch · TO: Field Team Tromsø</h3>
        <hr>
        <p>Hello Field Team,</p>
        <p>We've received an emergency distress signal from one of our vessels. Its last known location was in the Barents Sea, a few hundred kilometers west of Novaya Zemlya.</p>
        <p>We're now unable to contact the ship, and conditions in the area are very harsh.</p>
        <p>We'll start a rescue mission, but we're missing some critical information. It's good that we have someone on the ground in Tromsø, the gateway to the Arctic and the closest place we can operate from. Your first mission is to establish contact with the crew.</p>
        <p>We'll now connect you to the operational dispatch team, they will guide you.</p>
        <p>Thanks again! The crew is counting on you!</p>
        <p><strong>Arctic Rescue Dispatch</strong><br>Mission Coordination</p>
      </div>` : `<div class="phone-card email-preview"><div class="phone-bar"><span>09:41</span><span>●●● · 100%</span></div><p class="tag">MAIL · ONE NEW MESSAGE</p><h2>Arctic Rescue Dispatch</h2><p>URGENT: Arctic distress signal</p><button class="button button-secondary" type="button" data-action="open-email">Open email</button></div>`;
    root.innerHTML = screenFrame("01 · Mission phone", "A signal from the Arctic.", "The mission begins with a message from Arctic Rescue Dispatch.", `${email}${state.emailOpen ? '<div class="screen-actions"><button class="button" type="button" data-action="next">Contact Dispatch →</button></div>' : ""}`, "");
  }
  render();
  root.addEventListener("click", event => {
    if (event.target.closest('[data-action="open-email"]')) {
      state.emailOpen = true;
      render();
    }
  });
}
