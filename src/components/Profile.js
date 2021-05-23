import { Component } from "react";

export default class Profile extends Component {
  render() {
    const { name, matches, wins, points } = this.props.user;
    const rank = Math.min(+this.props.user.rank + 1, 4);

    return (
      <section id="profile">
        <div className="flex col">
          <h5 className="player-name">
            <span style={{ color: "white", fontSize: "1rem" }}>#{rank}</span>{" "}
            {name}
          </h5>
          <img
            src={`${process.env.PUBLIC_URL}/icons/icon-${rank}.png`}
            className="player-icon"
            alt="Player Icon"
          />
        </div>
        <div className="table">
          <div className="cell bg-red bold">M</div>
          <div className="cell bg-green bold">W</div>
          <div className="cell bg-yellow bold">
            <i className="fa fa-trophy"></i>
          </div>
          <div className="cell circle-badge">{matches}</div>
          <div className="cell circle-badge">{wins}</div>
          <div className="cell circle-badge">{points}</div>
        </div>
      </section>
    );
  }
}
