import { gsap } from "gsap";

// the callback function passed to addEventListener expects an Event object as its argument
addEventListener('DOMContentLoaded', (event) => {
  let t1 = gsap.timeline();

  t1.to("#heading", {
    opacity: 1,
    y: 0,
    duration: 0.7,
  }, "+=0.5")
  .to("p", {
    opacity: 1,
    y: 0,
    duration: 0.7,
    onComplete: () => {
      console.log('second is complete')
    }
  })
  .to(".buttons",{
    opacity: 1,
    y: 0,
    duration: 0.7,
    onStart: () => {
      console.log('third just started')
    }
  }, "<")

})
