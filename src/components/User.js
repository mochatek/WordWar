import { Component } from "react";
import Api from "../services/api";

export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      load: false,
      users: [],
    };
  }

  async componentDidMount() {
    const { msg } = await Api.get("users");
    this.setState({ users: msg, load: true });
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        {this.state.load ? (
          this.state.users.length ? (
            <p>{this.state.users}</p>
          ) : (
            <p>No registered users</p>
          )
        ) : (
          <p>Fetching registered users...</p>
        )}
      </div>
    );
  }
}
