import { callChoices, callTracks } from "./amundsen-call.js";
import { compassRiddle } from "./amundsen-riddle.js";
import { dispatchMessages, hackerIntrusion, hackerMessages, wannyArtifacts, wannyMessages } from "./content.js";
import { expeditions } from "./expeditions.js";
import { wannyCallChoices, wannyCallTracks } from "./wanny-call.js";

export const polarExplorersTour = {
  id: "polar-explorers",
  version: 1,
  title: "Polar Explorers",
  theme: "arctic",
  content: { dispatchMessages, wannyMessages, hackerMessages, hackerIntrusion, wannyArtifacts, wannyCallTracks, wannyCallChoices, callTracks, callChoices, expeditions, compassRiddle },
  steps: [
    { id: "email", title: "Incoming email", view: "email" },
    { id: "dispatch", title: "Dispatch chat", view: "dispatch" },
    { id: "radio", title: "Radio & Wanny call", view: "radio" },
    { id: "mission-complete", title: "Mission complete", view: "missionComplete" },
    { id: "hackers", title: "Hackers", view: "hackers" },
    { id: "call", title: "Amundsen's phone call", view: "call" },
    { id: "map", title: "Expedition map", view: "map" },
    { id: "riddle", title: "Compass riddle", view: "riddle" },
    { id: "complete", title: "Demo complete", view: "complete" }
  ]
};
