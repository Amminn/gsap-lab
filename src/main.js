import { gsap } from "gsap";

import { GSDevTools } from "gsap/GSDevTools";
import { ScrollTrigger } from "gsap/ScrollTrigger";

addEventListener("DOMContentLoaded", () => {
  gsap.to(".box", {
    keyframes: [{ x: 100 }, { y: 100 }, { x: 0 }, { y: 0 }],
  });
});
