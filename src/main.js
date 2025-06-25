import { gsap } from "gsap";
import navHtml from "./components/nav.html?raw";

import { GSDevTools } from "gsap/GSDevTools";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);
console.log("hello");
addEventListener("DOMContentLoaded", () => {
  document.getElementById("navbar-placeholder").innerHTML = navHtml;

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
        repeat: -1,
        each: 0.05,
        from: "start",
        yoyo: true,
      },
      repeatRefresh: true,
      ease: "power2.inOut",
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
        from: "start",
        repeat: -1,
        yoyo: true,
      },
      repeatRefresh: true,
      ease: "power2.inOut",
      repeat: -1,
    }
  );
});
