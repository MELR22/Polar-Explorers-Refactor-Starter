import { STORIES } from "./stories.js";

// These selections come from the original STORY definitions. The demo skips
// physical-location checks and the Nansen chapter without rewriting dialogue.
const dispatchSteps = STORIES.dispatch_intro.steps;
export const dispatchMessages = [
  dispatchSteps[0], dispatchSteps[2], dispatchSteps[3], dispatchSteps[4],
  dispatchSteps[12], dispatchSteps[13], dispatchSteps[14], dispatchSteps[15],
  dispatchSteps[16], dispatchSteps[17], dispatchSteps[18]
].filter(Boolean);

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

export const wannyArtifacts = [
  {
    id: "licence",
    title: "Wanny's Licence",
    image: "assets/images/Wanny/Wanny.jpg",
    caption: "TROMSØ · PERSONAL FILE",
    text: "After becoming a widow, Wanny needed an income to support her family. She began driving a taxi in Tromsø. Through her passengers she met people connected to Arctic hunting and trapping. Among them was Anders Sæterdal, who later invited her to overwinter on Svalbard.",
    letter: "F",
    choices: ["E", "F", "T"],
    evidence: "TROMS-F-06"
  },
  {
    id: "dogs",
    title: "Karo and Strøm",
    image: "assets/images/Wanny/Wanny_Dogs.jpg",
    caption: "PHOTO O - 15",
    text: "Karo and Strøm were working companions, not simply pets. They helped during journeys and dangerous hunts. The dogs could locate polar-bear dens beneath the snow. Their courage sometimes made hunting more difficult because Wanny and Anders had to avoid shooting them.",
    letter: "O",
    choices: ["C", "O", "Q"],
    evidence: "PHOTO O-15"
  },
  {
    id: "book",
    title: "A Page from Wanny's Book",
    image: null,
    caption: "APPENDIX X · OBJECT 3 OF 3",
    text: "Wanny later wrote about the difficult and sometimes monotonous parts of Arctic life. Food, weather and isolation could weaken motivation. A successful hunt or an unexpected bird could become an important source of courage.",
    letter: "X",
    choices: ["K", "X", "Y"],
    evidence: "APPENDIX X"
  }
];
