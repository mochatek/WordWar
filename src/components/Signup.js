import { Component, Fragment } from "react";
import { withRouter, NavLink } from "react-router-dom";
import Auth from "../services/auth";
import Footer from "./Footer";

class Signup extends Component {
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

    if (this.state.user.trim() && this.state.pass.trim()) {
      const { error } = await Auth.signup(this.state.user, this.state.pass);
      if (error) {
        this.setState({ error });
      } else {
        this.props.history.push("/signin");
      }
    } else {
      this.setState({ error: "Name/password missing" });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="flex col signup-page">
          <form onSubmit={this.doSignup} className="flex col auth">
            <h1>
              <i className="fa fa-book"></i>&nbsp;Signup
            </h1>
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
            {this.state.error ? (
              <p className="error">
                <i className="fa fa-times-circle"></i>&nbsp;
                {this.state.error}
              </p>
            ) : null}
            <button type="submit">SIGNUP</button>
            <h4>
              Registered?<NavLink to="/signin">Signin</NavLink>
            </h4>
          </form>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(Signup);
