import { Component } from "react";

export default class Challenge extends Component {
  constructor(props) {
    super(props);

    this.close = this.close.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  close(event) {
    event.preventDefault();
    this.props.closeHandler();
  }

  confirm(event) {
    event.preventDefault();
    this.props.confirmHandler();
  }

  render() {
    const { name, matches, wins, points, status } = this.props;
    return (
      <div>
        <p>Name: {name}</p>
        <p>Matches: {matches}</p>
        <p>Wins: {wins}</p>
        <p>Points: {points}</p>
        <p>
          Challenge ?
          <button onClick={this.confirm} disabled={status}>
            Confirm
          </button>
          <button onClick={this.close}>Close</button>
        </p>
      </div>
    );
  }
}
