import { Component, Fragment } from "react";
import Api from "../services/api";
import Auth from "../services/auth";
import Challenge from "./Challenge";
import socket from "../services/socket";

export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: 0,
      opponent: "",
      leaderboard: [],
      message: "",
    };

    this.challengePlayer = this.challengePlayer.bind(this);
    this.confirmChallenge = this.confirmChallenge.bind(this);
    this.cancelChallenge = this.cancelChallenge.bind(this);
    this.showChallenge = this.showChallenge.bind(this);
  }

  async componentDidMount() {
    const { error, stats } = await Api.get("stats");
    if (!error) this.setState({ stats });
    const { err, leaderboard } = await Api.get("leaderboard");
    if (!err) this.setState({ leaderboard });

    socket.emit("join", Auth.getUser());
    socket.on("challenge", this.showChallenge);
  }

  async challengePlayer(event) {
    event.preventDefault();
    const opponent_name = event.target.id;

    if (!this.state.opponent || this.state.opponent.name !== opponent_name) {
      const { error, stats } = await Api.get(`stats/${opponent_name}`);
      if (!error)
        this.setState({ opponent: { name: opponent_name, ...stats } });
    }
  }

  confirmChallenge() {
    socket.emit("challenge", this.state.opponent.name);
    this.setState({
      message: `You challenged ${this.state.opponent.name}`,
    });
  }

  cancelChallenge() {
    this.setState({ opponent: "" });
  }

  showChallenge(user) {
    this.setState({
      message: `${user} challenged you`,
    });
  }

  render() {
    return (
      <div>
        <h1>{Auth.getUser()}</h1>
        {this.state.message ? (
          <p style={{ color: "green", backgroundColor: "lightgreen" }}>
            {this.state.message}
          </p>
        ) : null}
        {this.state.stats ? (
          <Fragment>
            <p>Matches: {this.state.stats.matches}</p>
            <p>Wins: {this.state.stats.wins}</p>
            <p>Points: {this.state.stats.points}</p>
          </Fragment>
        ) : (
          <p>Loading stats</p>
        )}
        <h1>Leaderboard</h1>
        {this.state.leaderboard.length ? (
          <ul>
            {this.state.leaderboard.map((user) => {
              const { name, status } = user;
              return (
                <li key={name} id={name} onClick={this.challengePlayer}>
                  {name} : {status}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No players available</p>
        )}
        {this.state.opponent ? (
          <Challenge
            {...this.state.opponent}
            cancelHandler={this.cancelChallenge}
            confirmHandler={this.confirmChallenge}
          />
        ) : null}
      </div>
    );
  }
}
