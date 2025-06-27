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
  // console.log(windowWidth);
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
        // markers: true,
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

  // horizontal scroll
  // const slides = gsap.utils.toArray(".slide");

  // const HS = gsap.to(slides, {
  //   xPercent: -100 * (slides.length - 1),
  //   scrollTrigger: {
  //     trigger: "#horizontalSection",
  //     pin: true,
  //     start: "top top",
  //     end: "+=5000px",
  //     scrub: 1,

  //   },
  // });

  let sections = gsap.utils.toArray(".panel");
  let container = document.querySelector(".horizontal-container");

  console.log(container.scrollWidth);
  console.log(window.innerWidth);

  const panels = gsap.utils.toArray(".panel");

  const HS = gsap.to(sections, {
    x: () => -(container.scrollWidth - window.innerWidth) + "px",
    // x: -100 * (slides.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-container",
      pin: true,
      scrub: 1,
      start: "top top",
      end: () => "+=" + (container.scrollWidth - window.innerWidth),
      anticipatePin: 1,
    },
  });

  panels.forEach((e, i) => {
    const element = e.querySelectorAll("h2, p");

    if (i !== 0) {
      gsap.from(element, {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: e,
          start: "top center",
          containerAnimation: HS,
          markers: true,
          toggleActions: "play reverse play reverse", // you can add to retrigger the animation when back
        },
      });
    }
  });

  // frames

  const frames = gsap.utils.toArray(".frame");

  // Set zIndex so the top frame is visible first
  gsap.set(frames, { zIndex: (i) => -i + 1 });

  // 1. Base scroll per frame
  const baseScroll = 600;

  // 2. Define multipliers per frame
  const scrollMultipliers = [0.2, 1, 1]; // First frame scrolls faster (0.2 * 500 = 100px)

  // 3. Compute pixel durations per frame
  const scrollDurations = scrollMultipliers.map(
    (multiplier) => multiplier * baseScroll
  );

  // 4. Compute total scroll distance dynamically
  const totalScroll = scrollDurations.reduce((sum, px) => sum + px, 0);

  // 5. Build timeline with ScrollTrigger
  const framesTL = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: "#framesSection",
      start: "top top",
      end: `+=${totalScroll}px`, // 🔥 still dynamic
      pin: true,
      scrub: 1,
      markers: true,
    },
  });

  // 6. Add animations with individual durations
  frames.forEach((frame, i) => {
    if (i !== frames.length - 1) {
      framesTL.to(frame, {
        clipPath: "inset(0 0 100% 0)",
        duration: scrollDurations[i], // 🔥 dynamic duration
      });
    }
  });
});

//       end: `+=${frames.length * 500}px`,
