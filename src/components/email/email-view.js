import { screenFrame } from "../shared.js";

export function mountEmail(root, { state }) {
  const sentAt = new Date();
  const sentTime = new Intl.DateTimeFormat([], {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).format(sentAt);

  function render() {
    const emailContent = state.emailOpen
      ? `
        <article class="email-paper">
          <header class="email-header">
            <div class="email-sender-icon" aria-hidden="true">KS</div>
            <div class="email-sender-details">
              <strong>Kara Shipping Company</strong>
              <span>emergency@karashipping.no</span>
            </div>
            <time datetime="${sentAt.toISOString()}">Today, ${sentTime}</time>
          </header>

          <div class="email-addresses">
            <span><strong>To:</strong> Field Team · Tromsø</span>
            <span><strong>Subject:</strong> URGENT: Vessel in distress</span>
          </div>

          <div class="email-body">
          <p>Hello Field Team,</p>
          <p>We've received an emergency signal from one of our vessels. Its last known location was in the Barents Sea, about 260 kilometers west of Novaya Zemlya.</p>
          <p>We're now unable to contact the ship, and conditions in the area are very harsh.</p>
          <p>We'll start a rescue mission, but we're missing some critical information. It's good that we have someone on the ground in Tromsø, the gateway to the Arctic and the closest place we can operate from.</p>
          <p>We'll now connect you to the operational dispatch team, they will guide you.</p>

            <p>
              <a class="email-dispatch-link" href="#dispatch" data-action="next">
                Open the secure Dispatch channel →
              </a>
            </p>

            <p>Thanks again! The crew is counting on you.</p>

            <p>
              <strong>Kara Shipping Company</strong><br>
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
            <span class="email-preview-icon" aria-hidden="true">KS</span>
            <span class="email-preview-copy">
              <strong>Kara Shipping Company</strong>
              <span>URGENT: Arctic distress signal</span>
              <small>We’re now unable to contact the ship…</small>
            </span>
            <time>${sentTime}</time>
          </button>
        </section>
      `;

    root.innerHTML = screenFrame(
      "01 · Mission briefing",
      "An urgent request",
      "After starting the game, the players receive an urgent email from Kara Shipping Company requesting help to set up a rescue mission for a vessel trapped in the Arctic. The email links players to a Dispatch chat, where an operational team guides them through the mission. Players stay in touch with Dispatch throughout the game. Click on the link in the email to continue the demo.",
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