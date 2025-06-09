import { gsap } from "gsap";

import { GSDevTools } from "gsap/GSDevTools";

addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(GSDevTools);

  GSDevTools.create();
});

// autoAlpha
// using fromTo
