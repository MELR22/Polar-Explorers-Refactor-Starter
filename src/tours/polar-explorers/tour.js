import { callChoices, callTracks } from "./amundsen-call.js";
import { compassRiddle } from "./amundsen-riddle.js";
import { dispatchMessages, hackerIntrusion, hackerMessages, wannyMessages } from "./content.js";
import { expeditions } from "./expeditions.js";
import { wannyCallChoices, wannyCallTracks } from "./wanny-call.js";

export const polarExplorersTour = {
  id: "polar-explorers",
  version: 1,
  title: "Polar Explorers",
  theme: "arctic",
  content: { dispatchMessages, wannyMessages, hackerMessages, hackerIntrusion, wannyCallTracks, wannyCallChoices, callTracks, callChoices, expeditions, compassRiddle },
  steps: [
    { id: "email", title: "Mission briefing", view: "email" },
    { id: "dispatch", title: "Dispatch chat", view: "dispatch" },
    { id: "radio", title: "Riddles", view: "radio" },
    { id: "mission-complete", title: "Objective complete", view: "missionComplete" },
    { id: "hackers", title: "Other game elements", view: "hackers" },
    { id: "call", title: "Incoming call", view: "call" },
    { id: "map", title: "The inventory", view: "map" },
    { id: "riddle", title: "More riddles", view: "riddle" },
    { id: "complete", title: "Demo complete", view: "complete" }
  ]
};
