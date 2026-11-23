import { mountChatSequence, screenFrame } from "../shared.js";

export function mountDispatch(root, { playAudio, content }) {
  const wannyLead = content.wannyMessages[0];
  const messages = [...content.dispatchMessages, wannyLead];

  root.innerHTML = screenFrame(
    "02 · Dispatch chat",
    "A crew is counting on you.",
    "The existing Dispatch briefing, routed directly to Wanny for this preview.",
    `
      <section class="panel chat-box">
        <div class="tag">DISPATCHER TEAM · ONLINE</div>
        <div class="chat-stream" aria-live="polite"></div>
      </section>
    `,
    "Meet Wanny →"
  );

  const timeline = [
    messages[0],
    {
      type: "attachment",
      name: "SOS_Echo1.mp3",
      caption: "Play incoming transmission",
      audio: "assets/audio/sos.mp3"
    },
    ...messages.slice(1)
  ];

  mountChatSequence(root.querySelector(".chat-stream"), timeline);
}