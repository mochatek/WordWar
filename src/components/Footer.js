import { Fragment, useState, memo } from "react";
import { useNavigate } from "react-router-dom";

import Auth from "../services/auth";

import Instructions from "./Instructions";

const INFO_SOUND = new Audio(`${process.env.PUBLIC_URL}/sounds/info.ogg`);

const Footer = memo(function ({ signout }) {
  const [instruction, setInstruction] = useState(false);

  const navigate = useNavigate();

  function hideInstruction() {
    INFO_SOUND.play();
    setInstruction(false);
  }

  function toggleInfo() {
    INFO_SOUND.play();
    setInstruction(!instruction);
  }

  function exitGame() {
    Auth.signout();
    navigate("/signin");
  }

  return (
    <Fragment>
      <div className="footer flex">
        <span>
          <a
            href="https://github.com/mochatek"
            rel="noreferrer"
            target="_blank"
          >
            <i className="fa fa-github-square"></i>
          </a>
          <a
            href="https://in.linkedin.com/in/akash-s-panickar-9893ab155"
            rel="noreferrer"
            target="_blank"
          >
            <i className="fa fa-linkedin-square"></i>
          </a>
        </span>
        {signout ? (
          <Fragment>
            <span onClick={toggleInfo}>
              <i className="fa fa-info-circle"></i>
            </span>
            <span className="signout" onClick={exitGame}>
              Signout
            </span>
          </Fragment>
        ) : null}
        <span>&copy; MochaTek 2021</span>
      </div>
      {instruction && <Instructions closeHandler={hideInstruction} />}
    </Fragment>
  );
});

export default Footer;
