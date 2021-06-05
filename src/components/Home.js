import { Component, Fragment } from "react";
// import { withRouter } from "react-router-dom";
import Auth from "../services/auth";
import Api from "../services/api";
import socket from "../services/socket";

import Profile from "./Profile";
import Message from "./Message";
import Search from "./Search";
import Opponents from "./Opponents";
import Challenge from "./Challenge";
import Game from "./Game";
import Footer from "./Footer";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: Auth.getUser(),
        matches: 0,
        wins: 0,
        points: 0,
        rank: 0,
      },
      opponents: [],
      filtered_opponents: [],
      opponent_selected: null,
      challenging: null,
      challenged_by: null,
      message: null,
      game: null,
    };

    this.select_sound = new Audio(
      `${process.env.PUBLIC_URL}/sounds/select.ogg`
    );
    this.click_sound = new Audio(`${process.env.PUBLIC_URL}/sounds/click.ogg`);
    this.challenge_sound = new Audio(
      `${process.env.PUBLIC_URL}/sounds/challenge.ogg`
    );

    this.selectOpponent = this.selectOpponent.bind(this);
    this.deselectOpponent = this.deselectOpponent.bind(this);
    this.searchOpponent = this.searchOpponent.bind(this);
    this.refreshOpponents = this.refreshOpponents.bind(this);

    this.confirmChallenge = this.confirmChallenge.bind(this);
    this.cancelChallenge = this.cancelChallenge.bind(this);
    this.showChallenge = this.showChallenge.bind(this);
    this.acceptChallenge = this.acceptChallenge.bind(this);
    this.rejectChallenge = this.rejectChallenge.bind(this);

    this.closeMessage = this.closeMessage.bind(this);

    this.startGame = this.startGame.bind(this);
  }

  async componentDidMount() {
    socket.emit("join", this.state.user.name);

    const { error, stats } = await Api.get("stats");
    if (!error)
      this.setState((prev_state) => ({
        user: { ...prev_state.user, ...stats },
      }));

    const { err, opponents } = await Api.get("opponents");
    if (!err) this.setState({ opponents, filtered_opponents: opponents });

    socket.on("challenge", this.showChallenge);
    socket.on("sync", this.syncOpponents);

    // this.props.history.listen(() => {
    //   socket.emit("leave", this.state.user.name);
    // });
  }

  syncOpponents = (users) => {
    const opponents = [...this.state.opponents];

    users.forEach((user) => {
      const [name, status] = user;
      const opponent = opponents.find((op) => op.name === name);
      if (opponent) opponent.status = status;
    });

    this.setState({ opponents });
  };

  selectOpponent(name) {
    if (!this.state.challenging) {
      this.select_sound.play();
      this.setState({ opponent_selected: name });
    }
  }

  deselectOpponent() {
    this.click_sound.play();
    this.setState({ opponent_selected: null });
  }

  searchOpponent(player_name) {
    if (player_name) {
      const filtered_opponents = this.state.opponents.filter((op) =>
        op.name.includes(player_name)
      );
      this.setState({ filtered_opponents });
    } else {
      this.setState({ filtered_opponents: this.state.opponents });
    }
  }

  async refreshOpponents() {
    const { err, opponents } = await Api.get("opponents");
    if (!err) this.setState({ opponents, filtered_opponents: opponents });
  }

  confirmChallenge() {
    socket.emit("challenge", {
      status: "request",
      from: this.state.user.name,
      to: this.state.opponent_selected,
    });
    this.click_sound.play();
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
    this.click_sound.play();
    this.setState({ challenging: null, opponent_selected: null });
  }

  showChallenge({ status, from: user, room }) {
    this.challenge_sound.play();

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
        this.setState({
          challenging: null,
          message: `${user} ${status}ed the challenge`,
        });
        break;

      case "start":
        this.startGame(user, room);
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
    this.click_sound.play();
    this.setState({ challenged_by: null });
  }

  rejectChallenge() {
    socket.emit("challenge", {
      status: "reject",
      from: this.state.user.name,
      to: this.state.challenged_by,
    });
    this.click_sound.play();
    this.setState({ challenged_by: null });
  }

  closeMessage() {
    this.click_sound.play();
    this.setState({ message: null });
  }

  startGame(turn, room) {
    socket.off("challenge", this.showChallenge);
    socket.off("sync", this.syncOpponents);
    this.setState({ message: null, game: { turn, room } });
  }

  render() {
    if (this.state.game)
      return (
        <Game
          socket={socket}
          user={this.state.user.name}
          room={this.state.game.room}
          turn={this.state.game.turn}
        />
      );
    return (
      <Fragment>
        <Profile user={this.state.user} />
        <Search changeHandler={this.searchOpponent} />
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
        <h5 className="title">
          <i className="fa fa-users"></i>&nbsp;OPPONENTS
          <span style={{ color: "green" }} onClick={this.refreshOpponents}>
            <i className="fa fa-refresh"></i>
          </span>
        </h5>
        <Opponents
          players={this.state.filtered_opponents}
          selectHandler={this.selectOpponent}
        />
        <Footer signout={true} />
        <Challenge
          opponent={this.state.opponent_selected}
          confirm={this.confirmChallenge}
          deselect={this.deselectOpponent}
        />
      </Fragment>
    );
  }
}

// export default withRouter(Home);
export default Home;
