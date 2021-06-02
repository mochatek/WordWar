import { Component } from "react";

export default class End extends Component {
  constructor(props) {
    super(props);

    this.end_sound = new Audio(`${process.env.PUBLIC_URL}/sounds/end.ogg`);
  }

  componentDidMount() {
    this.end_sound.play();
  }

  componentWillUnmount() {
    this.end_sound.pause();
  }

  render() {
    const outcome = this.props.outcome ? "won" : "lost";

    return (
      <div className="modalDialog">
        <div className="flex col">
          <h3>{`You ${outcome} the challenge`}</h3>
          <img
            style={{ width: "15rem" }}
            src={`${process.env.PUBLIC_URL}/icons/${outcome}.png`}
            alt="outcome"
          />
          <div className="flex" style={{ justifyContent: "space-evenly" }}>
            <button
              className="bg-red"
              onClick={(event) => {
                event.preventDefault();
                window.location.reload(true);
              }}
            >
              <i className="fa fa-sign-out"></i>
              &nbsp;Exit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
