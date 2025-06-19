import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import vite from "/vite.svg";

import "./App.css";

gsap.registerPlugin(useGSAP);

function App() {
  const [valueX, setValueX] = useState(0);
  const container = useRef(null);
  const element = useRef(null);

  useGSAP(
    () => {
      gsap.to(".logo", {
        x: valueX,
      });
    },
    {
      scope: container,
      dependencies: [valueX],
      revertOnUpdate: true, // this will force the animation to start from the beginning point every time
    }
  );

  return (
    <>
      <button onClick={() => setValueX(gsap.utils.random(-200, 200))}>
        Click me
      </button>
      <div ref={container}>
        <img src={vite} className="logo" />
      </div>

      <img src={vite} ref={element} className="logo" />
    </>
  );
}

export default App;
