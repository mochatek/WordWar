import { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import Auth from "../services/auth";
import Api from "../services/api";
import socket from "../services/socket";

import Profile from "./Profile";
import Message from "./Message";
import Search from "./Search";
import Opponents from "./Opponents";
import Challenge from "./Challenge";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: Auth.getUser(),
        matches: 0,
        wins: 0,
        points: 0,
      },
      opponents: [],
      opponent_selected: null,
      challenging: null,
      challenged_by: null,
      message: null,
    };

    this.selectOpponent = this.selectOpponent.bind(this);
    this.deselectOpponent = this.deselectOpponent.bind(this);
    this.confirmChallenge = this.confirmChallenge.bind(this);
    this.cancelChallenge = this.cancelChallenge.bind(this);
    this.showChallenge = this.showChallenge.bind(this);
    this.acceptChallenge = this.acceptChallenge.bind(this);
    this.rejectChallenge = this.rejectChallenge.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
  }

  async componentDidMount() {
    const { error, stats } = await Api.get("stats");
    if (!error)
      this.setState((prev_state) => ({
        user: { ...prev_state.user, ...stats },
      }));

    const { err, opponents } = await Api.get("opponents");
    if (!err) this.setState({ opponents });

    socket.emit("join", this.state.user.name);
    socket.on("challenge", this.showChallenge);

    this.props.history.listen(() => {
      socket.emit("leave", this.state.user.name);
    });
  }

  selectOpponent(name) {
    // const opponent = this.state.opponents.find((user) => user.name === name);
    this.setState({ opponent_selected: name });
  }

  deselectOpponent() {
    this.setState({ opponent_selected: null });
  }

  confirmChallenge() {
    socket.emit("challenge", {
      status: "request",
      from: this.state.user.name,
      to: this.state.opponent_selected,
    });
    this.setState({
      challenging: this.state.opponent_selected,
      opponent_selected: null,
    });
  }

  cancelChallenge() {
    socket.emit("challenge", {
      status: "cancel",
      from: this.state.user.name,
      to: this.state.challenging,
    });
    this.setState({ challenging: null, opponent_selected: null });
  }

  showChallenge({ status, from: user }) {
    switch (status) {
      case "request":
        this.setState({
          challenged_by: user,
        });
        break;
      case "cancel":
        this.setState({ challenged_by: null });
        break;
      case "reject":
      case "accept":
        this.setState({ challenging: null });
        this.setState({ message: `${user} ${status}ed the challenge` });
        break;
      case "start":
        this.setState({ message: "Game started" });
        break;
      default:
        console.error("Unknown status");
        break;
    }
  }

  acceptChallenge() {
    socket.emit("challenge", {
      status: "accept",
      from: this.state.user.name,
      to: this.state.challenged_by,
    });
    this.setState({ challenged_by: null });
  }

  rejectChallenge() {
    socket.emit("challenge", {
      status: "reject",
      from: this.state.user.name,
      to: this.state.challenged_by,
    });
    this.setState({ challenged_by: null });
  }

  closeMessage() {
    this.setState({ message: null });
  }

  render() {
    return (
      <Fragment>
        <Profile user={this.state.user} />
        <Message
          listeners={[
            this.state.challenging,
            this.state.challenged_by,
            this.state.message,
          ]}
          handlers={[
            this.cancelChallenge,
            this.acceptChallenge,
            this.rejectChallenge,
            this.closeMessage,
          ]}
        />
        <Search />
        <Opponents
          players={this.state.opponents}
          selectHandler={this.selectOpponent}
        />
        <Challenge
          opponent={this.state.opponent_selected}
          confirm={this.confirmChallenge}
          deselect={this.deselectOpponent}
        />
      </Fragment>
    );
  }
}

export default withRouter(Home);
