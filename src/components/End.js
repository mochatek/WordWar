import { Component } from "react";

export default class End extends Component {
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
                window.location.reload();
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
