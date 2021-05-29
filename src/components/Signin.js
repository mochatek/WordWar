import { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import Auth from "../services/auth";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
      error: "",
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.doSignin = this.doSignin.bind(this);
  }

  changeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  async doSignin(event) {
    event.preventDefault();

    const { error } = await Auth.signin(this.state.user, this.state.pass);
    if (error) {
      this.setState({ error });
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <form onSubmit={this.doSignin}>
        <h1>Signin</h1>
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
        <button type="submit">Signin</button>
        <NavLink to="/signup">Signup</NavLink>
      </form>
    );
  }
}

export default withRouter(Signin);
