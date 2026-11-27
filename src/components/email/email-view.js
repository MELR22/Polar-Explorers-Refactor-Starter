import { screenFrame } from "../shared.js";

export function mountEmail(root, { state, playAudio }) {
  const sentAt = new Date();
  const sentTime = new Intl.DateTimeFormat([], {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).format(sentAt);

  function render() {
    let emailContent;

    if (state.emailOpen) {
      emailContent = `
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
            <p>We'll now connect you to the operational dispatch team, who will guide you.</p>

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
      `;
    } else if (state.emailDelivered) {
      emailContent = `
        <section class="email-inbox-card">
          <div class="email-inbox-toolbar">
            <span>INBOX</span>
            <span>1 new message</span>
          </div>

          <button class="email-preview email-arrival" type="button" data-action="open-email">
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
    } else {
      emailContent = `
        <section class="email-lock-screen" aria-label="Locked phone">
          <div class="email-lock-content">
            <svg class="email-lock-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 10V7a5 5 0 0 1 10 0v3M6 10h12v11H6z" />
            </svg>

            <p class="email-lock-date">Today</p>
            <time class="email-lock-time">${sentTime}</time>
            <p class="email-lock-status" aria-live="polite">
              No new messages.
            </p>
          </div>
        </section>
      `;
    }

    root.innerHTML = screenFrame(
      "01 · Mission briefing",
      "An urgent request",
      "After starting the game, the players receive an email from Kara Shipping Company requesting urgent help to set up a rescue mission for a vessel trapped in the Arctic. The email links players to a chat, where an operational team guides them through the mission. Players stay in touch with this team throughout the game. Click on the link in the email to continue the demo",
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

  if (!state.emailDelivered && !state.emailOpen) {
    window.setTimeout(() => {
      // If the player has already left this page, don't update its contents.
      if (!root.querySelector(".email-lock-screen")) return;

      state.emailDelivered = true;
      render();

      playAudio?.("assets/audio/ES_Notification, Mobile, App, General 01 - Epidemic Sound.mp3", null, { volume: 0.5 });
    }, 2200);
  }
}