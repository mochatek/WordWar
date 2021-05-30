import { Component, Fragment } from "react";
import Api from "../services/api";
import Header from "./Header";
import Words from "./Words";
import Controls from "./Controls";
import End from "./End";

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      turn: this.props.turn === this.props.user,
      word: "",
      user_words: [],
      opponent_words: [],
      start_letter: "",
      time: 20,
      error: null,
      winner: null,
    };

    this.opponent = this.props.room
      .replace(this.props.user, "")
      .replace("-", "");

    this.socket = this.props.socket;

    this.interval_id = 0;
    this.word_history = [];

    this.startTimer = this.startTimer.bind(this);
    this.endGame = this.endGame.bind(this);

    this.setWord = this.setWord.bind(this);
    this.submitWord = this.submitWord.bind(this);
    this.showWord = this.showWord.bind(this);
  }

  componentDidMount() {
    this.socket.on("word", this.showWord);
    this.socket.on("end", this.endGame);
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.interval_id);

    this.interval_id = setInterval(() => {
      if (this.state.time === 0) {
        clearInterval(this.interval_id);
        this.setState({ turn: false });

        this.socket.emit("end", { room: this.props.room });
      } else {
        this.setState((prevState) => {
          return { time: prevState.time - 1 };
        });
      }
    }, 1000);
  }

  endGame(winner) {
    clearInterval(this.interval_id);
    this.socket.off("word", this.showWord);
    this.socket.off("end", this.endGame);
    this.setState({ winner });
  }

  setWord(word) {
    if (this.state.turn) {
      if (word.startsWith(this.state.start_letter)) {
        this.setState({ word, error: null });
      } else {
        this.setState({ error: `Must start with ${this.state.start_letter}` });
      }
    }
  }

  async submitWord() {
    if (this.state.word) {
      if (this.word_history.includes(this.state.word)) {
        this.setState({ error: "Word already used" });
      } else {
        const { error, meaning } = await Api.getMeaning(this.state.word);
        if (error) {
          this.setState({ error });
        } else {
          this.socket.emit("word", {
            room: this.props.room,
            from: this.props.user,
            word: this.state.word,
            meaning,
            error,
          });
          this.setState({ word: "", turn: false });
        }
      }
    }
  }

  showWord({ from, word, meaning, turn }) {
    this.word_history.push(word);

    if (from === this.props.user) {
      const user_words = [...this.state.user_words, { word, meaning }];
      this.setState({ user_words, turn: turn === this.props.user, time: 20 });
    } else {
      const opponent_words = [...this.state.opponent_words, { word, meaning }];
      this.setState({
        opponent_words,
        turn: turn === this.props.user,
        time: 20,
        start_letter: word.slice(-1),
      });
    }

    this.startTimer();
  }

  render() {
    return (
      <Fragment>
        <Header
          user={this.props.user}
          opponent={this.opponent}
          time={this.state.time}
        />
        <Words
          user_words={this.state.user_words}
          opponent_words={this.state.opponent_words}
        />
        {this.state.error && (
          <p className="error">
            <i className="fa fa-times-circle"></i>&nbsp;{this.state.error}
          </p>
        )}
        <Controls
          word={this.state.word}
          turn={this.state.turn}
          wordHandler={this.setWord}
          submitHandler={this.submitWord}
        />
        {this.state.winner && (
          <End outcome={this.props.user === this.state.winner} />
        )}
      </Fragment>
    );
  }
}
