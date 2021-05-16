import { Component } from "react";
import Auth from "../services/auth";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
      error: "",
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.doSignup = this.doSignup.bind(this);
  }

  changeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  async doSignup(event) {
    event.preventDefault();

    const { error, msg } = await Auth.signup(this.state.user, this.state.pass);
    if (error) {
      this.setState({ error });
    } else {
      alert(msg);
    }
  }

  render() {
    return (
      <form onSubmit={this.doSignup}>
        <h1>Signup</h1>
        <input
          type="text"
          name="user"
          placeholder="Player name"
          value={this.state.user}
          onChange={this.changeHandler}
        />
        <input
          type="password"
          name="pass"
          placeholder="Password"
          value={this.state.pass}
          onChange={this.changeHandler}
        />
        {this.state.error ? <p className="error">{this.state.error}</p> : null}
        <button type="submit">Signup</button>
      </form>
    );
  }
}
