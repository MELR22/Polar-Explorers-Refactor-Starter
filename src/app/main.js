import { polarExplorersTour } from "../tours/polar-explorers/tour.js";
import { createTourRunner } from "./tour-runner.js";

const runner = createTourRunner({ tour: polarExplorersTour });
runner.start();
