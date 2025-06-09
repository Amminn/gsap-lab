import { gsap } from "gsap";
// import { GSDevTools } from "gsap/GSDevTools"; // Assuming you have this imported elsewhere

addEventListener("DOMContentLoaded", () => {
  // gsap.registerPlugin(GSDevTools); // Register plugins once

  let mm = gsap.matchMedia();

  // Desktop animation setup
  mm.add("(min-width: 700px)", (context) => {
    // This `context` object is provided by matchMedia callback
    // It contains the conditions that just matched.
    // In this case, `context.conditions.isDesktop` will be true.

    let desktopTween = gsap.to("h1", {
      rotate: 360,
      duration: 2,
      repeat: -1,
      ease: "none",
      immediateRender: false,
      // You can even set an ID for easier killing if needed later
      id: "desktopRotation",
    });

    // Return a function to be executed when the media query no longer matches (i.e., when going to mobile)
    return () => {
      // Kill the desktop tween when the desktop media query is no longer active
      desktopTween.kill();
      // Or you can target by ID: gsap.killTweensOf("#desktopRotation");
      // And reset the rotation for a clean transition to mobile state
      gsap.set("h1", { rotate: 0 }); // Reset `h1` rotation to 0 for the mobile animation to start clean
    };
  });

  // Mobile animation setup
  mm.add("(max-width: 699px)", (context) => {
    // Use max-width for mobile for clear breakpoints
    // In this case, `context.conditions.isMobile` will be true (or whatever you've named it)
    let mobileTween = gsap.to("h1", {
      rotate: -360, // Rotate in the opposite direction
      duration: 2,
      repeat: -1,
      ease: "none",
      immediateRender: false,
      id: "mobileRotation",
    });

    // Return a function to be executed when the media query no longer matches (i.e., when going to desktop)
    return () => {
      // Kill the mobile tween when the mobile media query is no longer active
      mobileTween.kill();
      // Or: gsap.killTweensOf("#mobileRotation");
      // Reset the rotation for a clean transition to desktop state
      gsap.set("h1", { rotate: 0 });
    };
  });

  // GSDevTools.create(); // Create GSDevTools after all animations are set up
});

// mm.add("(prefers-reduce-motion:no-preference)", () => {
//   gsap.to(".buttons", {
//     rotate: 360,
//     repeat: -1,
//     duration: 2,
//     ease: "none",
//   });
// });
