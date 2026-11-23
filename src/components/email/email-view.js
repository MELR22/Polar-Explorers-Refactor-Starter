import { screenFrame } from "../shared.js";

export function mountEmail(root, { state }) {
  function render() {
    const emailContent = state.emailOpen
      ? `
        <article class="email-paper">
          <header class="email-header">
            <div class="email-sender-icon" aria-hidden="true">AD</div>
            <div class="email-sender-details">
              <strong>Arctic Rescue Dispatch</strong>
              <span>dispatch@arctic-rescue.no</span>
            </div>
            <time datetime="09:41">Today, 09:41</time>
          </header>

          <div class="email-addresses">
            <span><strong>To:</strong> Field Team · Tromsø</span>
            <span><strong>Subject:</strong> URGENT: Arctic distress signal</span>
          </div>

          <div class="email-body">
          <p>Hello Field Team,</p>
          <p>We've received an emergency distress signal from one of our vessels. Its last known location was in the Barents Sea, a few hundred kilometers west of Novaya Zemlya.</p>
          <p>We're now unable to contact the ship, and conditions in the area are very harsh.</p>
          <p>We'll start a rescue mission, but we're missing some critical information. It's good that we have someone on the ground in Tromsø, the gateway to the Arctic and the closest place we can operate from. Your first mission is to establish contact with the crew.</p>
          <p>We'll now connect you to the operational dispatch team, they will guide you.</p>
          <p>Thanks again! The crew is counting on you!</p>
            <p>
              We’ll now connect you to the operational Dispatch team. They
              will guide you.
            </p>

            <p>
              <a class="email-dispatch-link" href="#dispatch" data-action="next">
                Open the secure Dispatch channel →
              </a>
            </p>

            <p>Thanks again! The crew is counting on you.</p>

            <p>
              <strong>Arctic Rescue Dispatch</strong><br>
              Mission Coordination
            </p>
          </div>
        </article>
      `
      : `
        <section class="email-inbox-card">
          <div class="email-inbox-toolbar">
            <span>INBOX</span>
            <span>1 new message</span>
          </div>

          <button class="email-preview" type="button" data-action="open-email">
            <span class="email-preview-icon" aria-hidden="true">AD</span>
            <span class="email-preview-copy">
              <strong>Arctic Rescue Dispatch</strong>
              <span>URGENT: Arctic distress signal</span>
              <small>We’re now unable to contact the ship…</small>
            </span>
            <time>09:41</time>
          </button>
        </section>
      `;

    root.innerHTML = screenFrame(
      "01 · Mission phone",
      "A signal from the Arctic.",
      "A new message has arrived in your inbox.",
      emailContent,
      ""
    );
  }

  render();

  root.addEventListener("click", event => {
    if (event.target.closest('[data-action="open-email"]')) {
      state.emailOpen = true;
      render();
      return;
    }

    if (event.target.closest('[data-action="next"]')) {
      event.preventDefault();
    }
  });
}