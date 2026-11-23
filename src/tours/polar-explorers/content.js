import { STORIES } from "./stories.js";

// These selections come from the original STORY definitions. The demo skips
// physical-location checks and the Nansen chapter without rewriting dialogue.
const dispatchSteps = STORIES.dispatch_intro.steps;
export const dispatchMessages = [
  {
    type: "text",
    sender: "Dispatch",
    text: "Dear field team, it’s great to have you on board for this mission!"
  },
  {
    type: "text",
    sender: "Dispatch",
    text: "We’ve just received an SOS call, along with the vessel’s last known position: 74.50845°N, 45.01421°E."
  },
  {
    type: "file",
    sender: "Dispatch",
    name: "SOS_Echo1.mp3",
    audio: "assets/audio/sos.mp3"
  },
  {
    type: "text",
    sender: "Dispatch",
    text: "We haven’t been able to re-establish contact, so restoring communication will be your first mission."
  },
  {
    type: "text",
    sender: "Dispatch",
    text: "It’s a good thing you’re in Tromsø. The city is full of people who know the Arctic inside out."
  },
  {
    type: "text",
    sender: "Dispatch",
    text: "Before we continue, what should we call your team?"
  },
  {
    type: "input",
    variable: "teamName",
    question: "Send us your team name.",
    placeholder: "Team name"
  },
  {
    type: "text",
    sender: "Dispatch",
    text: "Understood, Team {teamName}! We think Wanny Woldstad may be able to help us restore communication."
  },
  {
    type: "text",
    sender: "Dispatch",
    text: "She is Svalbard’s first female hunter and knows the value of good communication."
  },
  {
    type: "text",
    sender: "Dispatch",
    text: "Unfortunately, we’ve lost contact with her. Before that happened, she sent us this photo. We believe it shows an artwork of Wanny somewhere in Tromsø."
  },
  {
    type: "file",
    sender: "Dispatch",
    name: "Wanny_Painting_Old.png",
    image: "assets/images/Wanny_Painting_Old.png"
  },
  {
    type: "text",
    sender: "Dispatch",
    text: "The image is too unclear, but we think it may contain a clue to contact her."
  },
  {
    type: "text",
    sender: "Dispatch",
    text: "Have a look at this location, and use this radio to try establish contact."
  },
];

export const wannyMessages = STORIES.wanny_dispatch.steps.filter(
  step => step.type === "text"
);
export const hackerMessages = STORIES.signal_intercepted.steps.filter(
  step => step.type === "text"
);
export const hackerIntrusion = {
  statement: "We have taken over this communication channel.",
  video: "assets/images/monument_video.mp4",
  codeLines: [
    "[ SIGNAL OVERRIDE INITIATED ]",
    "inject_channel(dispatcher.main_link)",
    "bypass_protocol(alpha.473)",
    "target_team = 'expedition'",
    "disabling remote relay...",
    "intercept_success = TRUE",
    "opening private transmission..."
  ]
};

