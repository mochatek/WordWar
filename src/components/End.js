import { Component } from "react";

export default class End extends Component {
  render() {
    const outcome = this.props.outcome ? "won" : "lost";

    return (
      <div className="modalDialog">
        <div>
          <h3>{`You ${outcome} the game.`}</h3>
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
