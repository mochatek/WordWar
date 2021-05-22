import { Component } from "react";

export default class Challenge extends Component {
  render() {
    return this.props.opponent ? (
      <div className="modalDialog">
        <div>
          <h3>Wanna challenge {this.props.opponent} ?</h3>
          <div className="flex" style={{ justifyContent: "space-evenly" }}>
            <button
              className="button bg-green"
              onClick={() => this.props.confirm()}
            >
              Confirm
            </button>
            <button
              className="button bg-red"
              onClick={() => this.props.deselect()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    ) : null;
  }
}
