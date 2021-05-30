import { Component } from "react";

export default class Controls extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.changeWord = this.changeWord.bind(this);
  }

  submit(event) {
    event.preventDefault();
    this.props.submitHandler();
  }

  changeWord(event) {
    event.preventDefault();
    const word = event.target.value.trim().toLocaleLowerCase();
    this.props.wordHandler(word);
  }

  render() {
    const border = this.props.turn ? "3px solid green" : "none";

    return (
      <form id="controls" className="flex" onSubmit={this.submit}>
        <input
          type="text"
          className="word-text"
          placeholder="Type your word.."
          value={this.props.word}
          onChange={this.changeWord}
          style={{ border }}
          autoFocus={this.props.turn}
        />
        <button className="bg-yellow" type="submit">
          <i className="fa fa-send"></i>
        </button>
      </form>
    );
  }
}
