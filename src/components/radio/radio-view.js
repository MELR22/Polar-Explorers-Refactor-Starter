import { escapeHtml, screenFrame } from "../shared.js";

const labels = ["Breads", "Wannies", "Animals"];
const target = [6, 5, 2];

export function mountRadio(root, { state, content, playAudio, onNext, audioElement, getAudioAnalyser }) {
  const tracks = content.wannyCallTracks;
  const choices = content.wannyCallChoices;
  let startedCall = false;
  let activeTrack = null;
  let animationFrame = 0;
  let waveformStart = 0;

  root.innerHTML = screenFrame("03 · Radio interaction", "A voice in the static.", "Find Wanny's frequency to hear the original call and its response choices. You can skip the riddle or the full call at any time.", `
    <section class="panel radio-panel">
      <div class="tag">SHORTWAVE SIGNAL TUNER</div>
      <canvas class="signal-canvas" id="signal-canvas" aria-label="Radio signal and live audio waveform"></canvas>
      <div class="knob-row">${labels.map((label, index) => `<div><button class="knob" type="button" data-knob="${index}" aria-label="Turn ${label} dial"></button><div class="knob-count" id="knob-count-${index}">0</div><div class="knob-label">${label}</div></div>`).join("")}</div>
      <p id="radio-feedback" class="micro" aria-live="polite">Signal unstable… turn the dials to tune in.</p>
      <section id="wanny-call" class="wanny-call" hidden aria-live="polite"></section>
    </section>`, "Continue demo →");

  const canvas = root.querySelector("#signal-canvas");
  const context = canvas.getContext("2d");
  const feedback = root.querySelector("#radio-feedback");
  const callPanel = root.querySelector("#wanny-call");

  function prepareCanvas() {
    const width = Math.max(320, canvas.clientWidth || 500);
    const height = width * 220 / 500;
    const ratio = window.devicePixelRatio || 1;
    if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
    }
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    return { width, height };
  }

  function drawGrid(width, height) {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#020b10";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "rgba(234,240,232,.075)";
    context.lineWidth = 1;
    const spacing = Math.max(25, width / 20);
    for (let x = 0; x <= width; x += spacing) {
      context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke();
    }
    for (let y = 0; y <= height; y += spacing) {
      context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke();
    }
  }

  function drawTuner() {
    const { width, height } = prepareCanvas();
    drawGrid(width, height);
    const drawWave = (color, amplitude, frequency, phase, lineWidth = 3) => {
      context.beginPath(); context.strokeStyle = color; context.lineWidth = lineWidth;
      for (let x = 0; x <= width; x++) {
        const y = height / 2 + Math.sin((x / width) * Math.PI * 2 * frequency + phase) * amplitude;
        x === 0 ? context.moveTo(x, y) : context.lineTo(x, y);
      }
      context.stroke();
    };
    const phases = [Math.PI / 2, Math.PI, 0, Math.PI * 1.5, Math.PI / 4, Math.PI * .75, Math.PI * 1.25, Math.PI * 1.75];
    drawWave("#edc779", height * .22, 2, 0, 2);
    drawWave("#80e994", state.signal[0] === 6 ? height * .22 : height * (.08 + state.signal[0] * .022), state.signal[1] === 5 ? 2 : .75 + state.signal[1] * .25, phases[state.signal[2]], 3);
  }

  function drawLiveWave() {
    if (!activeTrack) return;
    const { width, height } = prepareCanvas();
    drawGrid(width, height);
    const analyser = getAudioAnalyser?.();
    const values = analyser ? new Uint8Array(analyser.fftSize) : null;
    if (analyser) analyser.getByteTimeDomainData(values);
    const elapsed = (performance.now() - waveformStart) / 1000;
    context.beginPath();
    context.strokeStyle = "#80e994";
    context.shadowColor = "rgba(128,233,148,.55)";
    context.shadowBlur = 8;
    context.lineWidth = 3;
    for (let x = 0; x <= width; x++) {
      const index = values ? Math.floor((x / width) * (values.length - 1)) : 0;
      const sample = values ? (values[index] - 128) / 128 : Math.sin(x / width * Math.PI * 13 + elapsed * 8) * (.25 + .18 * Math.sin(elapsed * 2.1));
      const y = height / 2 + sample * height * .35;
      x === 0 ? context.moveTo(x, y) : context.lineTo(x, y);
    }
    context.stroke();
    context.shadowBlur = 0;
    animationFrame = requestAnimationFrame(drawLiveWave);
  }

  function refreshTuner() {
    drawTuner();
    state.signal.forEach((value, index) => {
      root.querySelector(`#knob-count-${index}`).textContent = value;
      root.querySelector(`[data-knob="${index}"]`).style.transform = `rotate(${value * 45}deg)`;
    });
    const matched = state.signal.every((value, index) => value === target[index]);
    feedback.textContent = state.wannyCallDone
      ? "Frequency matched. Wanny's call is complete."
      : matched ? "Signal matched. Wanny is answering…" : "Signal unstable… turn the dials to tune in.";
    feedback.style.color = matched ? "var(--color-accent)" : "var(--color-gold)";
    if (matched && !startedCall && !state.wannyCallDone) connectToWanny();
  }

  function updateSubtitles() {
    if (!activeTrack || !audioElement) return;
    const lines = tracks[activeTrack].lines;
    const duration = audioElement.duration;
    const index = Number.isFinite(duration) && duration > 0
      ? Math.min(lines.length - 1, Math.floor((audioElement.currentTime / duration) * lines.length))
      : 0;
    const subtitle = callPanel.querySelector("[data-subtitle]");
    if (subtitle) subtitle.textContent = lines[index] || "";
  }

  function showCall(status, body) {
    callPanel.hidden = false;
    callPanel.innerHTML = `<div class="call-profile"><img src="assets/images/Wanny/Wanny.jpg" alt="Wanny Woldstad"><div><strong>Wanny Woldstad</strong><div class="micro">SHORTWAVE · LIVE</div></div></div><div class="call-lines"><p data-subtitle>${escapeHtml(status)}</p></div>${body || ""}`;
  }

  function showChoices(keys) {
    activeTrack = null;
    cancelAnimationFrame(animationFrame);
    drawTuner();
    showCall("Waiting for your response…", `<div class="choice-list">${keys.map(key => `<button class="button button-secondary" type="button" data-wanny-choice="${key}">${escapeHtml(choices[key])}</button>`).join("")}</div>`);
  }

  function playTrack(key, after) {
    activeTrack = key;
    waveformStart = performance.now();
    showCall("Listening…");
    drawLiveWave();
    const lines = tracks[key].lines;
    updateSubtitles();
    if (audioElement) audioElement.ontimeupdate = updateSubtitles;
    playAudio(tracks[key].file, () => {
      activeTrack = null;
      cancelAnimationFrame(animationFrame);
      drawTuner();
      if (audioElement) audioElement.ontimeupdate = null;
      if (after) after();
    });
  }

  function finishCall() {
    state.wannyCallDone = true;
    onNext();
  }

  function connectToWanny() {
    startedCall = true;
    root.querySelectorAll("button[data-knob]").forEach(button => { button.disabled = true; });
    feedback.textContent = "Frequency locked. A faint buzz comes through the speaker…";
    playAudio("assets/audio/Click.m4a", () => playTrack("intro", () => showChoices(["A"])));
  }

  // Static starts when this screen is entered from the Dispatch button.
  if (!state.wannyCallDone) playAudio("assets/audio/Noise_Wanny.mp3", null, {
    loop: true,
    volume: 0.18
  });
  drawTuner();
  refreshTuner();
  if (state.wannyCallDone) showCall("Call complete. Wanny's objects are next.");

  root.addEventListener("click", event => {
    const knob = event.target.closest("button[data-knob]");
    if (knob && !startedCall) {
      const index = Number(knob.dataset.knob);
      state.signal[index] = (state.signal[index] + 1) % 8;
      refreshTuner();
      return;
    }

    const choice = event.target.closest("button[data-wanny-choice]")?.dataset.wannyChoice;
    if (!choice) return;
    if (choice === "A") playTrack("rescue", () => showChoices(["B", "C"]));
    if (choice === "B") playTrack("goodbye", finishCall);
    if (choice === "C") playTrack("svalbardQuestion", () => showChoices(["D", "E"]));
    if (choice === "D") playTrack("beenThere", () => playTrack("svalbardStory", () => showChoices(["F", "G"])));
    if (choice === "E") playTrack("notBeenThere", () => playTrack("svalbardStory", () => showChoices(["F", "G"])));
    if (choice === "F") playTrack("missionGoodbye", finishCall);
    if (choice === "G") playTrack("familyStory", finishCall);
  });

  window.addEventListener("resize", drawTuner, { passive: true });
}
