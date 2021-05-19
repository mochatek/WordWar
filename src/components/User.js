import { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import Api from "../services/api";
import Auth from "../services/auth";
import Challenge from "./Challenge";
import socket from "../services/socket";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: "",
      leaderboard: [],
      opponent_selected: "",
      challenging: "",
      challenged_by: "",
    };

    this.selectOpponent = this.selectOpponent.bind(this);
    this.deselectOpponent = this.deselectOpponent.bind(this);
    this.confirmChallenge = this.confirmChallenge.bind(this);
    this.cancelChallenge = this.cancelChallenge.bind(this);
    this.showChallenge = this.showChallenge.bind(this);
    this.acceptChallenge = this.acceptChallenge.bind(this);
    this.rejectChallenge = this.rejectChallenge.bind(this);
  }

  async componentDidMount() {
    const { error, stats } = await Api.get("stats");
    if (!error) this.setState({ stats });
    const { err, leaderboard } = await Api.get("leaderboard");
    if (!err) this.setState({ leaderboard });

    socket.emit("join", Auth.getUser());
    socket.on("challenge", this.showChallenge);

    this.props.history.listen(() => {
      socket.emit("leave", Auth.getUser());
    });
  }

  async selectOpponent(event, opponent_name, status) {
    event.preventDefault();

    if (
      !this.state.opponent_selected ||
      this.state.opponent_selected.name !== opponent_name
    ) {
      const { error, stats } = await Api.get(`stats/${opponent_name}`);
      if (!error)
        this.setState({ opponent_selected: { name: opponent_name, ...stats } });
    }
  }

  deselectOpponent() {
    this.setState({ opponent_selected: "" });
  }

  confirmChallenge() {
    socket.emit("challenge", {
      status: "request",
      from: Auth.getUser(),
      to: this.state.opponent_selected.name,
    });
    this.setState({
      challenging: this.state.opponent_selected.name,
      opponent_selected: "",
    });
  }

  cancelChallenge() {
    socket.emit("challenge", {
      status: "cancel",
      from: Auth.getUser(),
      to: this.state.challenging,
    });
    this.setState({ challenging: "", opponent_selected: "" });
  }

  showChallenge({ status, from: user }) {
    switch (status) {
      case "request":
        this.setState({
          challenged_by: user,
        });
        break;
      case "cancel":
        this.setState({ challenged_by: "" });
        break;
      case "reject":
      case "accept":
        this.setState({ challenging: "" });
        alert(`${user} ${status}ed the challenge`);
        break;
      default:
        console.error("Unknown status");
    }
  }

  acceptChallenge(event) {
    event.preventDefault();

    socket.emit("challenge", {
      status: "accept",
      from: Auth.getUser(),
      to: this.state.challenged_by,
    });
    this.setState({ challenged_by: "" });
  }

  rejectChallenge(event) {
    event.preventDefault();

    socket.emit("challenge", {
      status: "reject",
      from: Auth.getUser(),
      to: this.state.challenged_by,
    });
    this.setState({ challenged_by: "" });
  }

  render() {
    return (
      <div>
        <h1>{Auth.getUser()}</h1>
        {this.state.challenging ? (
          <Fragment>
            <p style={{ color: "green", backgroundColor: "lightgreen" }}>
              You are challenging: {this.state.challenging}
            </p>
            <button onClick={this.cancelChallenge}>Cancel</button>
          </Fragment>
        ) : null}
        {this.state.challenged_by ? (
          <Fragment>
            <p style={{ color: "red", backgroundColor: "pink" }}>
              You are challenged by: {this.state.challenged_by}
            </p>
            <button onClick={(event) => this.acceptChallenge(event)}>
              Accept
            </button>
            <button onClick={(event) => this.rejectChallenge(event)}>
              Reject
            </button>
          </Fragment>
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
                <li
                  key={name}
                  onClick={(event) => this.selectOpponent(event, name, status)}
                >
                  {name} : {status}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No players available</p>
        )}
        {this.state.opponent_selected ? (
          <Challenge
            {...this.state.opponent_selected}
            status={!!this.state.challenging}
            closeHandler={this.deselectOpponent}
            confirmHandler={this.confirmChallenge}
          />
        ) : null}
      </div>
    );
  }
}

export default withRouter(User);
