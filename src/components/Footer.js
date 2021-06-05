import { Component, Fragment } from "react";
import Instructions from "./Instructions";
import Auth from "../services/auth";

export default class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show_instruction: false,
    };

    this.info_sound = new Audio(`${process.env.PUBLIC_URL}/sounds/info.ogg`);

    this.hideInstruction = this.hideInstruction.bind(this);
  }

  hideInstruction() {
    this.info_sound.play();
    this.setState({ show_instruction: false });
  }

  render() {
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
          {this.props.signout ? (
            <Fragment>
              <span
                onClick={() => {
                  this.info_sound.play();
                  this.setState({
                    show_instruction: !this.state.show_instruction,
                  });
                }}
              >
                <i
                  className="fa fa-info-circle"
                  style={{ color: "lightblue", fontSize: "1.5rem" }}
                ></i>
              </span>
              <span
                className="signout"
                onClick={() => {
                  Auth.signout();
                  window.location.reload();
                }}
              >
                Signout
              </span>
            </Fragment>
          ) : null}
          <span>&copy; MochaTek 2021</span>
        </div>
        {this.state.show_instruction && (
          <Instructions closeHandler={this.hideInstruction} />
        )}
      </Fragment>
    );
  }
}
