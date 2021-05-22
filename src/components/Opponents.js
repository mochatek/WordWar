import { Component } from "react";

export default class Opponents extends Component {
  render() {
    const status_category = { 0: "red", 1: "green", 2: "orange" };

    return (
      <section id="opponents">
        {this.props.players.map((player) => {
          return (
            <div
              className="opponent"
              key={player.name}
              onClick={() => this.props.selectHandler(player.name)}
            >
              <div className="opponent-profile">
                <img
                  src={`${process.env.PUBLIC_URL}/icons/icon-a.png`}
                  className="opponent-icon"
                  alt="Player Icon"
                />
                <span className="opponent-name">{player.name}</span>
              </div>
              <div
                className={`opponent-status bg-${
                  status_category[player.status]
                }`}
              ></div>
            </div>
          );
        })}
      </section>
    );
  }
}
