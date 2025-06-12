import { gsap } from "gsap";

import { GSDevTools } from "gsap/GSDevTools";
import { ScrollTrigger } from "gsap/ScrollTrigger";

addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(GSDevTools, ScrollTrigger);

  const tween = gsap.to(".card-img", {
    rotate: 360,
    duration: 5,
  })

  ScrollTrigger.create({
    animation: tween,
    trigger: "#container",
    start: "top +=200px",
    markers: true,
    end: "+=800px center",
    toggleActions: "play pause restart complete",
    once: false,
    // scrub: true,
    // onEnter,
    // onLeave,
    // onEnterBack
    // onLeaveBack
  })
  GSDevTools.create();
});
