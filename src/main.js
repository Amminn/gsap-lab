import { gsap } from "gsap";

import { GSDevTools } from "gsap/GSDevTools";

addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(GSDevTools);

  let mm = gsap.matchMedia();

  mm.add("(min-width: 700px)"),
    () => {
      gsap.to(".buttons", {
        rotate: 360,
        repeat: -1,
        duration: 2,
        ease: "none",
      });
    };

  GSDevTools.create();
});
