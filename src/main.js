import { gsap } from "gsap";


// gsap.from("h1", {
//   x: -100,
// })

// gsap.to("h1", {
//   duration: 2,
//   x: 0,
//   ease: "bounce.out"
// })

gsap.fromTo('h1', {
  x: -100,
  opacity: 0,
}, {
  duration: 2,
  x: 100,
  opacity: 1,
  ease: "bounce.out"
})

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.to(".box1", {
    y: 100,
    duration: 2,
    repeat: -1,
    yoyo: true
  })
})