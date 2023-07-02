import { useRef } from "react";
import animations from "create-keyframe-animation";

function App() {
  const firstBlock = useRef(0);
  const secondBlock = useRef(0);
  const thirdBlock = useRef(0);
  const buttonStart = useRef(0);

  const handleClick = () => {
    const firstBlockCoord = firstBlock.current.getBoundingClientRect();
    const secondBlockCoord = secondBlock.current.getBoundingClientRect();
    const thirdBlockCoord = thirdBlock.current.getBoundingClientRect();
    buttonStart.current.setAttribute("disabled", "");

    const startMove = [
      secondBlockCoord.x -
        thirdBlockCoord.x +
        secondBlockCoord.width / 2 -
        thirdBlockCoord.width / 2,
      secondBlockCoord.y -
        thirdBlockCoord.y +
        secondBlockCoord.height / 2 -
        thirdBlockCoord.height / 2,
    ];
    const endMove = [
      firstBlockCoord.x -
        thirdBlockCoord.x +
        firstBlockCoord.width / 2 -
        thirdBlockCoord.width / 2,
      firstBlockCoord.y -
        thirdBlockCoord.y +
        firstBlockCoord.height / 2 -
        thirdBlockCoord.height / 2,
    ];

    animations.registerAnimation({
      name: "move",
      animation: [startMove, endMove],
      presets: {
        duration: 5000,
        easing: "linear",
      },
    });

    thirdBlock.current.classList.remove("opacity-0");

    animations.runAnimation(thirdBlock.current, "move").then(function () {
      thirdBlock.current.classList.add("opacity-0");
      animations.unregisterAnimation("move");
      buttonStart.current.removeAttribute("disabled", "");
    });
  };

  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="flex flex-col gap-20 items-center justify-center w-full h-full max-w-3xl  px-10">
        <div className="flex items-center justify-between w-full">
          <div
            ref={firstBlock}
            className="w-40 h-40 aspect-square bg-emerald-900"
          >
            <div
              ref={thirdBlock}
              className="w-10 h-10 fixed rounded-full opacity-0 z-10 bg-orange-600"
            ></div>
          </div>
          <div
            ref={secondBlock}
            className="w-40 h-40 aspect-square bg-emerald-900 flex justify-center items-center animate-up-down"
          ></div>
        </div>
        <div className="flex w-full items-center">
          <button
            onClick={() => handleClick()}
            ref={buttonStart}
            className="p-1 w-20 rounded-xl hover:bg-slate-400 bg-slate-500"
          >
            Старт
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
