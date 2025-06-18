import { gsap } from "gsap";

import { GSDevTools } from "gsap/GSDevTools";
import { ScrollTrigger } from "gsap/ScrollTrigger";

addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(GSDevTools, ScrollTrigger);

  const slides = gsap.utils.toArray(".slide");

  let scrollTween = gsap.to(slides, {
    xPercent: -100 * (slides.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: "#app",
      start: "top top",
      scrub: 1,
      pin: true,
    },
  });

  gsap.to("#yellow-box", {
    rotate: 360,
    x: 200,
    y: 200,
    scrollTrigger: {
      trigger: "#yellow-container",
      start: "top center",
      end: "+=500",
      scrub: true,
      markers: true,
      containerAnimation: scrollTween,
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
    },
  });
  gsap.to("#red-box", {
    rotate: 360,
    x: -200,
    y: 200,
    scrollTrigger: {
      trigger: "#yellow-container",
      start: "top center",
      end: "+=500",
      scrub: true,
      markers: true,
      containerAnimation: scrollTween,
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
    },
  });

  // 2. Create the ScrollTrigger and link it to the paused tween
  // ScrollTrigger.create({
  //   animation: tween,
  //   trigger: "#box",
  //   start: "top 80%",
  //   end: "bottom 20%",
  //   toggleActions: "play pause resume reset",
  //   scrub: 1,
  //   onEnter: () => {
  //     console.log("enter");
  //   },
  //   onLeave: () => {
  //     console.log("leave");
  //   },
  //   onEnterBack: () => {
  //     console.log("enter back");
  //   },
  //   onLeaveBack: () => {
  //     console.log("leave back");
  //   },
  //   markers: true,
  // });

  // onEnter, onLeave, onEnterBack, onLeaveBack;

  // GSDevTools.create();
});
