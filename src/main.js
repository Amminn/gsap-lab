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
  gsap.to(".box", {
    y: 100,
    stagger: {
      each: 0.1,
      from: 'end', // from where will the animation start | index
      // grid: 'auto', // 
      ease: 'power2.inOut',
      repeat: -1 // Repeats immediately, not waiting for the other staggered animations to finish
    },
    duration: 2,
    // repeat: -1,
    // yoyo: true
  })
})