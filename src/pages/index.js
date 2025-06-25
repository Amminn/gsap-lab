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
    y: "random(-200, 200)",
    x: "random(-100, 300)",
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
      duration: 10,
      ease: "none",
      stagger: {
        yoyo: true,
        repeat: -1,
        amount: 0.1,
      },
    }
  );

  const introTL = gsap.timeline({
    default: { ease: "power1.inOut", duration: 2 },
  });

  // Make sure #heroSection is visible and has overflow hidden for clipPath to work
  const heroSection = document.querySelector("#heroSection");

  introTL
    .from("#heroSection", {
      clipPath: "inset(20% 20% 20% 20%)",
      delay: 1,
    })
    .from(
      "#heroSection :is(h1,p,button)",
      {
        clipPath: "inset(100% 0 0 0)",
        stagger: 0.1,
        y: 50,
      },
      "<20%"
    );

  const heroTL = gsap
    .timeline({
      scrollTrigger: {
        trigger: "#heroSection",
        start: "top center",
        markers: true,
        scrub: 1,
      },
    })
    .to(
      ".cloud-png",
      {
        scale: 2,
      },
      0
    )
    .to(
      ".cloud-png-1",
      {
        scale: 2,
      },
      0
    );
});
