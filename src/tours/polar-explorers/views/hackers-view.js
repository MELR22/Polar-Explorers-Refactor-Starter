import {
  escapeHtml,
  mountChatSequence,
  screenFrame
} from "../../../components/shared.js";

const codeClasses = [
  "code-red",
  "code-green",
  "code-blue",
  "code-yellow",
  "code-green",
  "code-red",
  "code-blue"
];

export function mountHackers(root, { content }) {
  const intrusion = content.hackerIntrusion;

  root.innerHTML = screenFrame(
    "05 · Other game elements",
    "Making the game come alive.",
    "Short videos and sudden interruptions bring the game unexpected twist to the mission. In this case, hackers interfere...",
    `
      <section class="panel chat-box hacker-chat-panel" aria-label="Dispatch chat">
        <div class="hacker-scanlines" aria-hidden="true"></div>
        <div class="hacker-noise" aria-hidden="true"></div>
        <div class="hacker-blackout" aria-hidden="true"></div>

        <div class="tag" id="hacker-chat-status">
          DISPATCHER TEAM · ONLINE
        </div>

        <div class="chat-stream hacker-chat-stream" id="hacker-chat-stream"></div>

        <div class="hacker-mask-message" id="hacker-mask-message" hidden>
          <img src="assets/images/mask_hacker.png" alt="Masked intruder">
          <div>
            <span class="sender">UNKNOWN TRANSMISSION</span>
            <strong>${escapeHtml(intrusion.statement)}</strong>
          </div>
        </div>

        <div class="intrusion-card hacker-code-card" id="hacker-code-card" hidden>
          <p class="micro">SIGNAL OVERRIDE · RUNNING</p>
          <pre id="hacker-code-lines"></pre>
        </div>

        <div class="hacker-video-message" id="hacker-video-message" hidden>
          <p class="micro">INCOMING TRANSMISSION · ENCRYPTED</p>
          <video
            class="hacker-video-projection"
            id="hacker-video"
            controls
            playsinline
            preload="auto"
            poster="assets/images/mask_hacker.png"
          >
            <source src="${intrusion.video}" type="video/mp4">
          </video>
        </div>

        <div
          class="hacker-disconnect-layer"
          id="hacker-disconnect-layer"
          hidden
          aria-live="assertive"
        >
          <span class="hacker-disconnect-text glitch">
            Connection interrupted
          </span>
        </div>
      </section>
    `,
    "Continue demo →"
  );
  root.querySelector(".phone-app")?.classList.add("phone-app-hackers");
  const panel = root.querySelector(".hacker-chat-panel");
  const stream = root.querySelector("#hacker-chat-stream");
  const status = root.querySelector("#hacker-chat-status");
  const disconnectLayer = root.querySelector("#hacker-disconnect-layer");
  const codeCard = root.querySelector("#hacker-code-card");
  const codeLines = root.querySelector("#hacker-code-lines");
  const maskMessage = root.querySelector("#hacker-mask-message");
  const videoMessage = root.querySelector("#hacker-video-message");
  const video = root.querySelector("#hacker-video");

  const timeouts = new Set();
  const intervals = new Set();

  function later(callback, delay) {
    const timer = window.setTimeout(() => {
      timeouts.delete(timer);
      if (panel.isConnected) callback();
    }, delay);

    timeouts.add(timer);
  }

  function scrollChat() {
    stream.scrollTop = stream.scrollHeight;
  }

  function flickerBlackout(times = 4, delay = 120) {
    let count = 0;

    const interval = window.setInterval(() => {
      if (!panel.isConnected) {
        window.clearInterval(interval);
        intervals.delete(interval);
        return;
      }

      panel.classList.add("hacker-flicker", "blackout-active");

      window.setTimeout(() => {
        if (panel.isConnected) {
          panel.classList.remove("blackout-active");
        }
      }, 70);

      count++;

      if (count >= times) {
        window.clearInterval(interval);
        intervals.delete(interval);
        panel.classList.remove("hacker-flicker");
      }
    }, delay);

    intervals.add(interval);
  }

  function showCodeAnimation() {
    status.textContent = "DISPATCHER TEAM · CONNECTION COMPROMISED";
    disconnectLayer.hidden = true;
    codeCard.hidden = false;
    codeLines.textContent = "";

    let index = 0;
    scrollChat();

    const interval = window.setInterval(() => {
      if (!panel.isConnected) {
        window.clearInterval(interval);
        intervals.delete(interval);
        return;
      }

      const line = document.createElement("div");
      line.className = `code-line ${codeClasses[index] || "code-green"}`;
      line.textContent = intrusion.codeLines[index];
      codeLines.appendChild(line);
      index++;

      if (index >= intrusion.codeLines.length) {
        window.clearInterval(interval);
        intervals.delete(interval);

        later(() => {
          codeCard.hidden = true;
          maskMessage.hidden = false;
          stream.appendChild(maskMessage);
          scrollChat();

          flickerBlackout(3, 140);

          later(() => {
            maskMessage.hidden = true;
            videoMessage.hidden = false;
            stream.appendChild(videoMessage);

            status.textContent =
              "DISPATCHER TEAM · PRIVATE TRANSMISSION OPEN";

            video.load();
            video.muted = false;

            video.play().catch(() => {
              // Fall back to muted autoplay if sound-on autoplay is blocked.
              video.muted = true;
              video.play().catch(() => { });
            });

            scrollChat();
          }, 3500);
        }, 1400);
      }
    }, 500);

    intervals.add(interval);
  }

  function startAttackSequence() {
    // Begin the takeover after the three Dispatch messages have appeared.
    later(() => {
      disconnectLayer.hidden = false;
      flickerBlackout(5, 130);
    }, 1200);

    later(() => {
      root.querySelector(".hacker-disconnect-text").textContent =
        "Unauthorized access";
    }, 2500);

    later(showCodeAnimation, 3800);
  }

  const stopChatSequence = mountChatSequence(
    stream,
    content.hackerMessages,
    { onComplete: startAttackSequence }
  );

  const observer = new MutationObserver(() => {
    if (!panel.isConnected) {
      stopChatSequence();

      for (const timer of timeouts) {
        window.clearTimeout(timer);
      }

      for (const interval of intervals) {
        window.clearInterval(interval);
      }

      video.pause();
      observer.disconnect();
    }
  });

  observer.observe(root, { childList: true });
}
