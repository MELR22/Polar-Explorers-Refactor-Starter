export const escapeHtml = value =>
  String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));

export function screenFrame(kicker, title, description, body, nextLabel = "Continue →") {
  return `<section class="screen">
    <div class="phone-stage-heading">
      <span class="eyebrow">FIELD PHONE</span>
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

export function formatChatTime(date = new Date()) {
  return new Intl.DateTimeFormat([], {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).format(date);
}

export function bubble(message, sender = "Dispatch") {
  return `<div class="bubble">
    <span class="sender">${escapeHtml(sender.toUpperCase())}</span>
    ${escapeHtml(message)}
  </div>`;
}

export function mountChatSequence(
  stream,
  entries,
  { onAttachment, onComplete, state = {} } = {}
) {
  let index = 0;
  let timer;

  function scrollToBottom() {
    stream.scrollTop = stream.scrollHeight;
  }

  function addTime(element) {
    const time = document.createElement("span");
    time.className = "message-time";
    time.textContent = formatChatTime();
    element.append(time);
  }

  function addMessage(text, sender = "Dispatch") {
    const isUser = sender.toLowerCase() === "you";
    const message = document.createElement("div");
    message.className = isUser
      ? "message from-user"
      : "message from-phone";

    const body = document.createElement("div");
    body.className = "message-text";
    body.textContent = text;

    message.append(body);
    addTime(message);
    stream.append(message);
    scrollToBottom();
  }

  function getTeamName() {
    if (state.teamName) return state.teamName;

    try {
      return localStorage.getItem("teamName") || "";
    } catch {
      return "";
    }
  }

  function showTypingThen(text, callback) {
    const typing = document.createElement("div");
    typing.className = "typing";
    typing.setAttribute("aria-label", "Dispatch is typing");
    typing.innerHTML = "<span></span><span></span><span></span>";
    stream.append(typing);
    scrollToBottom();

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const delay = reducedMotion
      ? 250
      : Math.min(500 + text.length * 45, 2500);

    timer = setTimeout(() => {
      typing.remove();
      callback();
    }, delay);
  }

  function showAudio(entry) {
    const card = document.createElement("div");
    card.className = "message from-phone sos-message";

    const heading = document.createElement("div");
    heading.className = "sos-heading";
    heading.textContent = "● SOS · EMERGENCY SIGNAL";

    const filename = document.createElement("div");
    filename.className = "sos-filename";
    filename.textContent = entry.name || "Audio attachment";

    const audio = document.createElement("audio");
    audio.controls = true;
    audio.preload = "metadata";
    audio.src = entry.audio;
    audio.volume = 0.75;
    audio.setAttribute("aria-label", "Play emergency distress transmission");

    const status = document.createElement("div");
    status.className = "sos-status";
    status.textContent = entry.caption || "Incoming transmission · tap play";

    audio.addEventListener("playing", () => {
      status.textContent = "Receiving transmission…";
      onAttachment?.(entry);
    });

    audio.addEventListener("ended", () => {
      status.textContent = "Transmission received";
    });

    card.append(heading, filename, audio, status);
    addTime(card);
    stream.append(card);
    scrollToBottom();

    timer = setTimeout(showNext, 350);
  }

  function showImage(entry, sender = "Dispatch") {
    const fromUser = sender.toLowerCase() === "you";
    const card = document.createElement("figure");
    card.className = fromUser
      ? "dispatch-image-attachment message from-user-photo"
      : "dispatch-image-attachment message from-phone";

    const caption = document.createElement("figcaption");
    caption.textContent = entry.name || (
      fromUser ? "Team photo sent" : "Photo from Dispatch"
    );

    const image = document.createElement("img");
    image.src = entry.image;
    image.alt = fromUser
      ? "Photo sent by your team"
      : "Photo sent by Dispatch";

    card.append(caption, image);
    addTime(card);
    stream.append(card);
    scrollToBottom();

    if (!fromUser) timer = setTimeout(showNext, 450);
  }

  function showInteractive(entry, type) {
    const prompt = entry.question || (
      type === "input"
        ? "Send us your team name."
        : "Send us a photo."
    );

    showTypingThen(prompt, () => {
      const message = document.createElement("div");
      message.className = "message from-phone";

      const body = document.createElement("div");
      body.className = "message-text";
      body.textContent = prompt;

      const form = document.createElement("form");
      form.className = "dispatch-response-form";

      const input = document.createElement("input");

      if (type === "input") {
        input.type = "text";
        input.name = entry.variable || "teamName";
        input.placeholder = entry.placeholder || "Team name";
        input.autocomplete = "off";
        input.maxLength = 32;
        input.required = true;
        input.setAttribute("aria-label", prompt);
      } else {
        input.type = "file";
        input.name = "teamPhoto";
        input.accept = entry.accept || "image/*";
        input.setAttribute("aria-label", "Choose a team photo");
        input.required = true;
      }

      const send = document.createElement("button");
      send.type = "submit";
      send.className = "button";
      send.textContent = type === "input" ? "Send" : "Send photo";

      form.append(input, send);
      message.append(body, form);
      addTime(message);
      stream.append(message);
      scrollToBottom();

      form.addEventListener("submit", event => {
        event.preventDefault();

        if (type === "input") {
          const answer = input.value.trim();
          if (!answer) return;

          const variable = entry.variable || "teamName";
          state[variable] = answer;

          try {
            localStorage.setItem(variable, answer);
          } catch {
            // The name still works for this chat session.
          }

          message.remove();
          addMessage(answer, "You");
          timer = setTimeout(showNext, 350);
          return;
        }

        const file = input.files?.[0];
        if (!file) return;

        message.remove();
        showImage(
          {
            name: file.name,
            image: URL.createObjectURL(file)
          },
          "You"
        );
        timer = setTimeout(showNext, 450);
      });
    });
  }

  function showLink(entry) {
    const text = entry.text || "Open the radio:";

    showTypingThen(text, () => {
      const message = document.createElement("div");
      message.className = "message from-phone";

      const body = document.createElement("div");
      body.className = "message-text";
      body.textContent = text;

      const link = document.createElement("button");
      link.type = "button";
      link.className = "dispatch-chat-link";
      link.dataset.action = "next";
      link.textContent = entry.label || "Open the radio →";

      message.append(body, link);
      addTime(message);
      stream.append(message);
      scrollToBottom();
    });
  }

  function showNext() {
    if (index >= entries.length) {
      onComplete?.();
      return;
    }

    // Get the next entry before checking its type.
    const entry = entries[index++];

    if (entry.type === "link" && entry.action === "next") {
      showLink(entry);
      return;
    }

    if (
      (entry.type === "attachment" || entry.type === "file") &&
      entry.audio
    ) {
      showAudio(entry);
      return;
    }

    if (
      entry.type === "imageAttachment" ||
      (entry.type === "file" && entry.image)
    ) {
      showImage(entry, entry.sender || "Dispatch");
      return;
    }

    if (entry.type === "input" || entry.type === "upload") {
      showInteractive(entry, entry.type);
      return;
    }

    const text = String(entry.text || "").replaceAll(
      "{teamName}",
      getTeamName()
    );

    showTypingThen(text, () => {
      addMessage(text, entry.sender || "Dispatch");
      timer = setTimeout(showNext, 250);
    });
  }

  showNext();

  return () => {
    clearTimeout(timer);
    stream.querySelector(".typing")?.remove();
  };
}