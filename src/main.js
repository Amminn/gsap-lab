import { gsap } from "gsap";

import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

document.addEventListener("DOMContentLoaded", (event) => {
  document.fonts.ready.then(() => {
    // wait for fonts to load, then do the splitting to avoid errors
    const split = SplitText.create("h1", {
      type: "lines",
      autoSplit: true,
      mask: true,
      ignore: "span",
    });

    gsap.from(split.lines, {
      opacity: 0,
      y: 60,
      stagger: {
        each: 0.1,
      },
      ease: "power2.inOut",
      duration: 1,
      // onComplete: () => {
      //   split.revert(); // once all the animation is done, the html will get back to it's original value
      // },
    });
  });
});
