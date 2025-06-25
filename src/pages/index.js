import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

addEventListener("DOMContentLoaded", () => {
  const smallImgs = document.querySelectorAll(".small-img");
  if (smallImgs.length === 0) {
    console.warn('No elements found with selector ".small-img".');
    return;
  }

  gsap.set(smallImgs, {
    y: "random(-200, 300)",
    x: "random(0, 500)",
    scale: "random(.1, .4)",
  });

  const windowWidth = window.innerWidth;
  console.log(windowWidth);
  gsap.fromTo(
    smallImgs,
    {
      x: `random(0, ${windowWidth})`,
    },
    {
      x: `random(0, ${windowWidth})`,
      duration: 30,
      ease: "none",
      stagger: {
        yoyo: true,
        repeat: -1,
        amount: 0.1,
      },
    }
  );
});
