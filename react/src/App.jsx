import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import vite from "/vite.svg";

import "./App.css";

gsap.registerPlugin(useGSAP);

function App() {
  const element = useRef(null);

  useGSAP((context, contextSafe) => {
    gsap.to(".logo-1", { rotate: 360 });

    const animate = contextSafe(() => {
      gsap.to(".logo-2", { rotate: 360 });
      console.log(context.data.length);
    });

    element.current.addEventListener("click", animate);
    console.log(context.data.length);

    return () => {
      element.current.removeEventListener("click", animate);
    };
  });

  return (
    <>
      <div>
        <img src={vite} className="logo logo-1" />
      </div>

      <img src={vite} ref={element} className="logo logo-2" />
    </>
  );
}

export default App;
