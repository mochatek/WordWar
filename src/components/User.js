import { Component, Fragment } from "react";
import Api from "../services/api";
import Auth from "../services/auth";

export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: 0,
    };
  }

  async componentDidMount() {
    const { error, stats } = await Api.get("stats");
    if (!error) this.setState({ stats });
  }

  render() {
    return (
      <div>
        <h1>{Auth.getUser()}</h1>
        {this.state.stats ? (
          <Fragment>
            <p>Matches: {this.state.stats.matches}</p>
            <p>Wins: {this.state.stats.wins}</p>
          </Fragment>
        ) : (
          <p>Loading stats</p>
        )}
      </div>
    );
  }
}
