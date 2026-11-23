import { mountChatSequence, screenFrame } from "../shared.js";

export function mountDispatch(root, { playAudio, content }) {
  const messages = [...content.dispatchMessages];

  root.innerHTML = screenFrame(
    "02 · Game set-up",
    "Dispatch chat",
    "The dispatch chat guides users through the game, which is set in the world of polar exploration in Tromsø. To find the information needed to set up a rescue mission, users must get in touch with former polar explorers such as Roald Amundsen, Fridtjof Nansen, and in this case Wanny Woldstad. Through these conversations, players learn more about these former heroes.",
    `
      <section class="panel chat-box">
        <div class="tag">DISPATCHER TEAM · ONLINE</div>
        <div class="chat-stream" aria-live="polite"></div>
      </section>
    `,
    "Continue demo →"
  );

  const timeline = messages.map(entry => {
    if (entry.type === "file" && entry.audio) {
      return {
        type: "attachment",
        name: entry.name,
        caption: "Play incoming transmission",
        audio: entry.audio
      };
    }

    if (entry.type === "file" && entry.image) {
      return {
        ...entry,
        type: "imageAttachment"
      };
    }

    return entry;
  });
  timeline.push({
    type: "link",
    sender: "Dispatch",
    text: "Ready? Open Wanny’s radio:",
    label: "Open the radio →",
    action: "next"
  });
  mountChatSequence(root.querySelector(".chat-stream"), timeline);
}