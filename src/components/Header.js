import { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <section id="header" className="flex">
        <div className="player-card flex col">
          <img
            src={`${process.env.PUBLIC_URL}/icons/icon-u.png`}
            alt="Player icon"
            className="player-icon"
          />
          <h6 className="player-name">{this.props.user}</h6>
        </div>
        <h1 className="timer">{this.props.time}</h1>
        <div className="player-card flex col">
          <img
            src={`${process.env.PUBLIC_URL}/icons/icon-o.png`}
            alt="Player icon"
            className="player-icon"
            style={{
              WebkitTransform: "scaleX(-1)",
              transform: "scaleX(-1)",
            }}
          />
          <h6 className="player-name">{this.props.opponent}</h6>
        </div>
      </section>
    );
  }
}
