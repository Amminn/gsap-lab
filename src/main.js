import { gsap } from "gsap";

import { GSDevTools } from "gsap/GSDevTools";
import { ScrollTrigger } from "gsap/ScrollTrigger";

addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(GSDevTools, ScrollTrigger);
  // gsap.to(".card-img", {
  //   duration: 10,
  //   rotate: 360,
  //   scrollTrigger: {
  //     trigger: "#container",
  //     start: "top 20%",
  //     end: "+=500",
  //     markers: true,
  //     // scrub: true,
  //     // pin: ".card-img",
  //   },
  // });

  const tween = gsap.to("#box", {
    rotate: 360,
    duration: 2,
    paused: true, // <-- IMPORTANT
  });

  // 2. Create the ScrollTrigger and link it to the paused tween
  ScrollTrigger.create({
    animation: tween,
    trigger: "#box",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play pause resume reset",
    onEnter: () => {
      console.log("enter");
    },
    onLeave: () => {
      console.log("leave");
    },
    onEnterBack: () => {
      console.log("enter back");
    },
    onLeaveBack: () => {
      console.log("leave back");
    },
    markers: true,
  });

  // onEnter, onLeave, onEnterBack, onLeaveBack;

  // GSDevTools.create();
});
