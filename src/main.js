import { gsap } from "gsap";

import { GSDevTools } from "gsap/GSDevTools";

addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(GSDevTools);

  let t1 = gsap.timeline();

  t1.from("h1", {
    opacity: 0,
    y: 100,
    duration: 1,
  });
  t1.from("p", {
    opacity: 0,
    y: 100,
    duration: 1,
    // immediateRender: false,
  });
  t1.from(".buttons", {
    opacity: 0,
    y: 100,
    duration: 1,
  });
  t1.from("h1", {
    opacity: 0,
    y: 100,
    duration: 1,
    immediateRender: false,
  });

  GSDevTools.create();
});
