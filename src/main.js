import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 2,
  });

  const smoother = ScrollSmoother.create({
    smooth: 2,
  });

  const button = document.getElementById("button");
  const button2 = document.getElementById("button2");
  const box1 = document.getElementById("box-1");
  const box2 = document.getElementById("box-2");

  box1.addEventListener("click", () => {
    smoother.paused(true);
    console.log(smoother);
  });

  box2.addEventListener("click", () => {
    smoother.paused(false);
  });

  button.addEventListener("click", () => {
    smoother.scrollTo(".box-c", true, "center, center");
  });

  button2.addEventListener("click", () => {
    smoother.scrollTop(0); // one note about this scrollTop, it doesn't have smooth scroll.
  });
});
