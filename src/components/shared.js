export const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[character]));

export function screenFrame(kicker, title, description, body, nextLabel = "Continue →") {
  return `<section class="screen">
    <div class="phone-stage-heading">
      <span class="eyebrow">FIELD PHONE · PLAYABLE</span>
      <span class="phone-stage-caption">INTERACTIVE DEMO</span>
    </div>

    <header class="step-context">
      <p class="kicker">${kicker}</p>
      <h1 class="title">${title}</h1>
      ${description ? `<p class="lead">${description}</p>` : ""}
    </header>

    <div class="phone-shell" aria-label="Interactive mission phone">
      <div class="phone-earpiece" aria-hidden="true"><span></span></div>
      <div class="phone-viewport">
        <div class="phone-app">${body}</div>
      </div>
      <div class="phone-home-indicator" aria-hidden="true"></div>
    </div>

    ${nextLabel
      ? `<div class="screen-actions screen-actions-outside">
             <button class="button" type="button" data-action="next">${nextLabel}</button>
           </div>`
      : ""
    }
  </section>`;
}

export function bubble(message, sender = "Dispatch") {
  return `<div class="bubble"><span class="sender">${escapeHtml(sender.toUpperCase())}</span>${escapeHtml(message)}</div>`;
}

export function mountChatSequence(
  stream,
  entries,
  { onAttachment, onComplete } = {}
) {
  let index = 0;
  let timer;

  function showNext() {
    if (index >= entries.length) {
      onComplete?.();
      return;
    }

    // Keep the rest of your existing function here.

    const entry = entries[index++];

    // The audio attachment appears in the conversation order, too.
    if (entry.type === "attachment") {
      const card = document.createElement("div");
      card.className = "message from-phone sos-message";

      const heading = document.createElement("div");
      heading.className = "sos-heading";
      heading.textContent = "● SOS · EMERGENCY SIGNAL";

      const filename = document.createElement("div");
      filename.className = "sos-filename";
      filename.textContent = entry.name;

      const audio = document.createElement("audio");
      audio.controls = true;
      audio.preload = "metadata";
      audio.src = entry.audio;
      audio.volume = 0.75;
      audio.setAttribute("aria-label", "Play emergency distress transmission");

      const status = document.createElement("div");
      status.className = "sos-status";
      status.textContent = "Incoming distress transmission · tap play";

      audio.addEventListener("playing", () => {
        status.textContent = "Receiving emergency transmission…";
      });
      audio.addEventListener("ended", () => {
        status.textContent = "Transmission received";
      });

      card.append(heading, filename, audio, status);
      stream.append(card);
      stream.scrollTop = stream.scrollHeight;

      timer = setTimeout(showNext, 350);
      return;
    }

    const text = String(entry.text || "").replaceAll(
      "{teamName}",
      localStorage.getItem("teamName") || ""
    );

    const typing = document.createElement("div");
    typing.className = "typing";
    typing.setAttribute("aria-label", "Dispatch is typing");
    typing.innerHTML = "<span></span><span></span><span></span>";
    stream.append(typing);
    stream.scrollTop = stream.scrollHeight;

    const reducedMotion = matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const delay = reducedMotion
      ? 250
      : Math.min(500 + text.length * 45, 2500);

    timer = setTimeout(() => {
      typing.remove();

      const message = document.createElement("div");
      message.className =
        entry.sender === "user" ? "message from-user" : "message from-phone";

      const body = document.createElement("div");
      body.className = "message-text";
      body.textContent = text;

      const time = document.createElement("span");
      time.className = "message-time";
      time.textContent = new Intl.DateTimeFormat([], {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
      }).format(new Date());

      message.append(body, time);
      stream.append(message);
      stream.scrollTop = stream.scrollHeight;

      timer = setTimeout(showNext, 250);
    }, delay);
  }

  showNext();

  // Optional cleanup if you later want to stop the sequence on navigation.
  return () => {
    clearTimeout(timer);
    stream.querySelector(".typing")?.remove();
  };
}

