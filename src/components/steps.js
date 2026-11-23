import { mountCall } from "./call/call-view.js";
import { mountDispatch } from "./chat/dispatch-view.js";
import { mountCompletion } from "./completion/completion-view.js";
import { mountEmail } from "./email/email-view.js";
import { mountHackers } from "./hackers/hackers-view.js";
import { mountInventory } from "./inventory/inventory-view.js";
import { mountMap } from "./map/map-view.js";
import { mountRadio } from "./radio/radio-view.js";
import { mountRiddle } from "./riddle/riddle-view.js";
import { mountMissionComplete } from "./completion/mission-complete-view.js";

export const stepViews = {
  email: mountEmail,
  dispatch: mountDispatch,
  inventory: mountInventory,
  radio: mountRadio,
  hackers: mountHackers,
  call: mountCall,
  map: mountMap,
  riddle: mountRiddle,
  complete: mountCompletion,
  missionComplete: mountMissionComplete
};
