import { stepViews } from "../components/steps.js";
import { createMemoryProgressStore } from "./progress-store.js";

export function createTourRunner({ tour, progressStore = createMemoryProgressStore() }) {
  const screen = document.querySelector("#screen");
  const stepList = document.querySelector("#step-list");
  const stepCount = document.querySelector("#step-count");
  const progressBar = document.querySelector("#progress-bar");
  const backButton = document.querySelector("#back-button");
  const audio = document.querySelector("#audio-player");
  let audioContext = null;
  let audioAnalyser = null;
  const sessionId = globalThis.crypto?.randomUUID?.() ?? `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const state = { inventorySelection: "licence", expedition: "gjoa", signal: [0, 0, 0], compassRotation: 225 };
  let currentIndex = 0;

  function updateNavigation() {
    const count = tour.steps.length;
    stepCount.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;
    progressBar.style.width = `${((currentIndex + 1) / count) * 100}%`;
    backButton.hidden = currentIndex === 0;
    stepList.innerHTML = tour.steps.map((step, index) => `<li><button type="button" data-step-index="${index}" ${index > currentIndex ? "disabled" : ""} ${index === currentIndex ? 'aria-current="step"' : ""}><span class="step-number">${index < currentIndex ? "✓" : String(index + 1).padStart(2, "0")}</span><span class="step-name">${step.title}</span></button></li>`).join("");
  }

  function getAudioAnalyser() {
    if (audioAnalyser) return audioAnalyser;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    try {
      audioContext = new AudioContextClass();
      audioAnalyser = audioContext.createAnalyser();
      audioAnalyser.fftSize = 512;
      const source = audioContext.createMediaElementSource(audio);
      source.connect(audioAnalyser);
      audioAnalyser.connect(audioContext.destination);
      return audioAnalyser;
    } catch (error) {
      console.warn("Live audio waveform is unavailable:", error);
      return null;
    }
  }

  function playAudio(path, onEnded, { loop = false, volume = 0.75 } = {}) {
    audio.pause();
    audio.currentTime = 0;
    audio.loop = loop;
    audio.volume = volume; // 0 = muted, 1 = full volume
    audio.src = path;
    audio.onended = onEnded ?? null;

    if (audioContext?.state === "suspended") {
      audioContext.resume().catch(() => { });
    }

    return audio.play().catch(error => {
      console.warn("Audio playback was blocked:", path, error);
    });
  }

  function render() {
    const step = tour.steps[currentIndex];
    updateNavigation();
    audio.pause();
    audio.loop = false;
    audio.onended = null;
    screen.innerHTML = "";
    stepViews[step.view](screen, {
      step, state, content: tour.content, onNext: () => go(currentIndex + 1), playAudio,
      audioElement: audio, getAudioAnalyser,
      onProgress: progress => progressStore.save(sessionId, { stepId: step.id, ...progress })
    });
    screen.focus({ preventScroll: true });
  }

  function go(index) {
    if (index < 0 || index >= tour.steps.length) return;
    currentIndex = index;
    render();
  }

  backButton.addEventListener("click", () => go(currentIndex - 1));
  stepList.addEventListener("click", event => {
    const button = event.target.closest("button[data-step-index]");
    if (button && !button.disabled) go(Number(button.dataset.stepIndex));
  });
  screen.addEventListener("click", event => {
    if (event.target.closest('[data-action="next"]')) go(currentIndex + 1);
  });

  return { start: render, go, getCurrentStep: () => tour.steps[currentIndex] };
}
