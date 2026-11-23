import { escapeHtml, screenFrame } from "../shared.js";

export function mountCall(root, { playAudio, content, audioElement }) {
  const { callTracks, callChoices } = content;
  const state = {
    active: false,
    declined: false,
    finished: false,
    subtitle: "",
    choices: []
  };
  let activeTrackKey = null;
  let subtitleCues = [];

  function buildSubtitleCues(trackKey, duration) {
    const lines = callTracks[trackKey]?.lines ?? [];
    if (!lines.length || !Number.isFinite(duration) || duration <= 0) return [];

    const weights = lines.map(line =>
      Math.max(3, line.trim().split(/\s+/).length)
    );
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let start = 0;

    return lines.map((text, index) => {
      const end = index === lines.length - 1
        ? duration + 0.05
        : start + duration * (weights[index] / totalWeight);

      const cue = { start, end, text };
      start = end;
      return cue;
    });
  }

  function prepareSubtitles() {
    if (!activeTrackKey || !audioElement) return;
    subtitleCues = buildSubtitleCues(activeTrackKey, audioElement.duration);
    updateSubtitle();
  }

  function updateSubtitle() {
    if (!audioElement || !activeTrackKey) return;

    const cue = subtitleCues.find(item =>
      audioElement.currentTime >= item.start &&
      audioElement.currentTime < item.end
    );

    state.subtitle = cue?.text ?? "";
    const subtitle = root.querySelector("#amundsen-subtitle");
    if (subtitle) subtitle.textContent = state.subtitle;
  }

  function updatePlaybackState() {
    const photo = root.querySelector(".amundsen-speaking-photo");
    const toggle = root.querySelector('[data-action="toggle-call-audio"]');
    const playing = Boolean(audioElement && !audioElement.paused && !audioElement.ended);

    photo?.classList.toggle("is-speaking", playing);
    if (toggle) toggle.textContent = playing ? "Pause audio" : "Resume audio";
  }

  function render() {
    const incoming = !state.active && !state.finished;
    const title = state.active
      ? "You are connected."
      : state.finished
        ? "The call has ended."
        : "Roald Amundsen is calling.";
    const description = state.active
      ? "Listen to the original call and choose how to respond."
      : state.finished
        ? "Amundsen's call is complete."
        : "An incoming call from the expedition.";

    const phoneContent = incoming
      ? `
        <section class="amundsen-incoming-call" aria-label="Incoming call from Roald Amundsen">
          <div class="amundsen-caller-photo">
            <img src="assets/images/Amundsen.jpg" alt="Roald Amundsen">
          </div>
          <p class="amundsen-incoming-label">${state.declined ? "CALL DECLINED" : "INCOMING CALL"}</p>
          <h2>Roald Amundsen</h2>
          <p class="amundsen-caller-subtitle">Arctic Explorer</p>
          <div class="amundsen-call-status" aria-live="polite">
            <span>${state.declined ? "CALL MISSED" : "AMUNDSEN · CALLING"}</span>
            ${state.declined ? "" : '<span class="amundsen-call-dots" aria-hidden="true"><i></i><i></i><i></i></span>'}
          </div>
          <div class="amundsen-call-actions">
            <button class="amundsen-call-button decline-call" type="button" data-action="decline-call" aria-label="Decline call">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8c1.5 3 3.9 5.4 6.9 6.9l2.3-2.3c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11 21 3 13 3 3c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"></path></svg>
            </button>
            <button class="amundsen-call-button accept-call" type="button" data-action="answer-call" aria-label="${state.declined ? "Call Amundsen back" : "Accept call"}">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8c1.5 3 3.9 5.4 6.9 6.9l2.3-2.3c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11 21 3 13 3 3c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"></path></svg>
            </button>
          </div>
        </section>`
      : `
        <section class="amundsen-connected-call" aria-label="Call with Roald Amundsen">

          <div class="amundsen-speaking-photo ${audioElement && !audioElement.paused ? "is-speaking" : ""}">
            <img src="assets/images/Amundsen.jpg" alt="Roald Amundsen">
          </div>
          <div class="amundsen-connected-heading">
            <p>Roald Amundsen</p>
          </div>

          <div class="amundsen-call-messages">
            <div
              id="amundsen-subtitle"
              class="amundsen-subtitle ${state.choices.length ? "has-choices" : ""}"
              aria-live="polite"
              aria-atomic="true"
            >
              ${state.choices.length
        ? `<div class="amundsen-response-choices" aria-label="Choose a response">
                    ${state.choices.map(key => `
                      <button class="button button-secondary" type="button" data-choice="${key}">
                        ${escapeHtml(callChoices[key])}
                      </button>
                    `).join("")}
                  </div>`
        : escapeHtml(state.subtitle || (state.finished ? "Call ended." : ""))
      }
            </div>

          <div class="amundsen-connected-controls">
            <button class="amundsen-control-button hangup"
              type="button" data-action="hang-up"
              aria-label="Stop call" title="Stop call">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.6 10.8c1.5 3 3.9 5.4 6.9 6.9l2.3-2.3c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11 21 3 13 3 3c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"></path>
              </svg>
            </button>
          </div>
        </section>`;

    root.innerHTML = screenFrame(
      "06 · Incoming call",
      title,
      description,
      phoneContent,
      "Continue to expedition map →"
    );

    updatePlaybackState();
  }

  function stopAudio() {
    if (!audioElement) return;
    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement.loop = false;
  }

  function playTrack(track, after) {
    state.active = true;
    state.declined = false;
    state.finished = false;
    state.choices = [];
    state.subtitle = "";
    activeTrackKey = track;
    subtitleCues = [];

    render();
    playAudio(callTracks[track].file, after);
  }

  function showChoices(...choices) {
    state.active = true;
    state.choices = choices;
    state.subtitle = "";
    activeTrackKey = null;
    render();
  }

  function finish() {
    state.active = false;
    state.finished = true;
    state.choices = [];
    state.subtitle = "Call ended.";
    activeTrackKey = null;
    render();
  }

  if (audioElement) {
    audioElement.addEventListener("loadedmetadata", prepareSubtitles);
    audioElement.addEventListener("durationchange", prepareSubtitles);
    audioElement.addEventListener("timeupdate", updateSubtitle);
    audioElement.addEventListener("play", updatePlaybackState);
    audioElement.addEventListener("pause", updatePlaybackState);
  }

  render();
  playAudio("assets/audio/Incoming_Call.m4a", null, { loop: true });

  root.addEventListener("click", event => {
    if (event.target.closest('[data-action="answer-call"]')) {
      stopAudio();
      playTrack("voice1", () => showChoices("A"));
      return;
    }

    if (event.target.closest('[data-action="decline-call"]')) {
      stopAudio();
      state.declined = true;
      render();
      return;
    }

    if (event.target.closest('[data-action="toggle-call-audio"]')) {
      if (!audioElement) return;

      if (audioElement.paused) {
        audioElement.play().catch(error =>
          console.warn("Audio playback was blocked:", error)
        );
      } else {
        audioElement.pause();
      }
      return;
    }

    if (event.target.closest('[data-action="hang-up"]')) {
      stopAudio();
      finish();
      return;
    }

    const choice = event.target.closest("button[data-choice]")?.dataset.choice;
    if (!choice) return;

    if (choice === "A") playTrack("voice2", () => showChoices("B", "C"));
    if (choice === "B") playTrack("voice2B", finish);
    if (choice === "C") playTrack("voice2C", () => showChoices("D", "E"));
    if (choice === "D") playTrack("voice3D", () => playTrack("voice3", finish));
    if (choice === "E") playTrack("voice3E", () => playTrack("voice3", finish));
  });
}