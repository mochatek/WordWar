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
              onClick={(event) => {
                event.preventDefault();
                window.location.reload(true);
              }}
            >
              <i className="fas fa-portal-exit">Exit</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
