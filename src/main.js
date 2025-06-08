import { gsap } from "gsap";
    
import { GSDevTools } from "gsap/GSDevTools";

gsap.registerPlugin(GSDevTools);

gsap.to("h1", {
  x: 100,
  duration: 1
})