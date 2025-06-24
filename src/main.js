import { gsap } from "gsap";

import { GSDevTools } from "gsap/GSDevTools";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

addEventListener("DOMContentLoaded", () => {
  let splitFirstTitle = SplitText.create(".first-title", {
    type: "chars",
  });

  let splitSecondTitle = SplitText.create(".second-title", {
    type: "chars",
  });

  gsap.fromTo(
    splitFirstTitle.chars,
    {
      y: -100,
    },
    {
      y: 100,
      duration: 1,
      stagger: {
        each: 0.05,
        from: "end",
      },
      repeatRefresh: true,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    }
  );
  gsap.fromTo(
    splitSecondTitle.chars,
    {
      y: -100,
    },
    {
      y: 100,
      duration: 1,
      stagger: {
        each: 0.05,
        from: "end",
      },
      repeatRefresh: true,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    }
  );
});
