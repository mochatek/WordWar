import { useEffect } from "react";

const END_SOUND = new Audio(`${process.env.PUBLIC_URL}/sounds/end.ogg`);

export default function End({ outcome }) {
  useEffect(() => {
    END_SOUND.play();
    return () => END_SOUND.pause();
  }, []);

  function gotoHome(event) {
    event.preventDefault();
    window.location.reload(true);
  }

  return (
    <div className="modalDialog">
      <div className="flex col">
        <h3>{`You ${outcome ? "won" : "lost"} the challenge`}</h3>

        <img
          src={`${process.env.PUBLIC_URL}/icons/${
            outcome ? "won" : "lost"
          }.png`}
          alt="outcome"
        />

        <div className="flex even">
          <button className="bg-red" onClick={gotoHome}>
            <i className="fa fa-sign-out"></i>
            &nbsp;Exit
          </button>
        </div>
      </div>
    </div>
  );
}
