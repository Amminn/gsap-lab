import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

import { CustomEase } from "gsap/CustomEase";
import { CustomWiggle } from "gsap/CustomWiggle";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  CustomEase,
  CustomWiggle
);

const urls = [
  "/frame-images/1.png",
  "/frame-images/2.png",
  "/frame-images/3.png",
  "/frame-images/4.png",
  "/frame-images/5.png",
  "/frame-images/6.png",
  "/frame-images/7.png",
  "/frame-images/8.png",
  "/frame-images/9.png",
  "/frame-images/10.png",
  "/frame-images/11.png",
  "/frame-images/12.png",
  "/frame-images/13.png",
  "/frame-images/14.png",
  "/frame-images/15.png",
  "/frame-images/16.png",
  "/frame-images/17.png",
  "/frame-images/18.png",
  "/frame-images/19.png",
  "/frame-images/20.png",
  "/frame-images/21.png",
  "/frame-images/22.png",
  "/frame-images/23.png",
  "/frame-images/24.png",
  "/frame-images/25.png",
];

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
          // markers: true,
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
      // markers: true,
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

  imageSequence({
    urls, // Array of image URLs
    canvas: "#image-sequence", // <canvas> selector
    scrollTrigger: {
      trigger: "#image-sequence",
      start: "top top",
      // end: "max",
      scrub: true,
      pin: true,
      // markers: true,
    },
  });

  function imageSequence(config) {
    let playhead = { frame: 0 },
      canvas = document.querySelector(config.canvas),
      ctx = canvas.getContext("2d"),
      onUpdate = config.onUpdate,
      images = [],
      loaded = 0;

    // Preload all images
    config.urls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loaded++;
        // Set canvas size to first image loaded
        if (i === 0) {
          canvas.width = img.width;
          canvas.height = img.height;
          updateImage();
        }
        // When all images loaded, draw current frame
        if (loaded === config.urls.length) updateImage();
      };
      images[i] = img;
    });

    function updateImage() {
      const frame = Math.round(playhead.frame);
      if (images[frame] && images[frame].complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[frame], 0, 0, canvas.width, canvas.height);
        onUpdate && onUpdate.call(this);
      }
    }

    return gsap.to(playhead, {
      frame: images.length - 1,
      ease: "none",
      onUpdate: updateImage,
      scrollTrigger: config.scrollTrigger,
    });
  }

  // Make sure your HTML has:
  // <div id="smooth-wrapper"><div id="smooth-content">...all your page content...</div></div>
  // Then uncomment below to enable ScrollSmoother:

  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1,
    effects: true, // <-- THIS IS THE MAGIC!
    smoothTouch: 0.1,
    ignoreMobileResize: true,
  });

  const split = SplitText.create("#splitter-text", {
    type: "chars",
  });

  gsap.from(split.chars, {
    opacity: 0.2,
    stagger: 0.05,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#yes-no",
      start: "top 30%",
      end: "top top",
      scrub: true,
      // markers: true,
    },
  });

  // button toggle animation
  const button = document.getElementById("button");
  const shape = document.getElementById("character");
  const bg = document.getElementById("toggle-bg");

  const limbs = gsap.utils.toArray(
    "#right-hand, #left-hand, #left-leg, #right-leg"
  );

  const limbsLeft = gsap.utils.toArray("#left-hand, #left-leg");
  const eyes = gsap.utils.toArray("#left-eye, #right-eye");

  let played = true;

  const animate = () => {
    gsap.to(shape, {
      x: played ? 0 : -24,
      duration: 2,
      ease: "elastic",
      overwrite: true,
    });

    gsap.set(limbsLeft, {
      transformOrigin: "right top",
    });

    gsap.fromTo(
      limbs,
      {
        rotate: 0,
      },
      {
        duration: 2,
        keyframes: {
          "50%": { rotate: played ? 60 : -60 },
          "100%": { rotate: 0 },
          easeEach: "wiggle(3)",
          overwrite: true,
        },
      }
    );
  };

  button.addEventListener("click", () => {
    played = !played;
    animate();
  });
});

//       end: `+=${frames.length * 500}px`,

/*
Helper function that handles scrubbing through a sequence of images, drawing the appropriate one to the provided canvas.
Config object properties:
  - urls [Array]: an Array of image URLs
  - canvas [Canvas]: the <canvas> object to draw to
  - scrollTrigger [Object]: an optional ScrollTrigger configuration object like {trigger: "#trigger", start: "top top", end: "+=1000", scrub: true, pin: true}
  - onUpdate [Function]: optional callback for when the Tween updates (probably not used very often)

 Returns a Tween instance
*/
