import { Component } from "react";

export default class Challenge extends Component {
  constructor(props) {
    super(props);

    this.cancel = this.cancel.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  cancel(event) {
    event.preventDefault();
    this.props.cancelHandler();
  }

  confirm(event) {
    event.preventDefault();
    this.props.confirmHandler();
  }

  render() {
    const { name, matches, wins, points } = this.props;
    return (
      <div>
        <p>Name: {name}</p>
        <p>Matches: {matches}</p>
        <p>Wins: {wins}</p>
        <p>Points: {points}</p>
        <p>
          Challenge ?<button onClick={this.confirm}>Confirm</button>
          <button onClick={this.cancel}>cancel</button>
        </p>
      </div>
    );
  }
}
