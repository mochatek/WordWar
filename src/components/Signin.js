import { Component, Fragment } from "react";
import { withRouter, NavLink } from "react-router-dom";
import Auth from "../services/auth";
import Footer from "./Footer";

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
    const value = event.target.value.trim().toLowerCase();
    this.setState({ [name]: value });
  }

  async doSignin(event) {
    event.preventDefault();

    if (this.state.user.trim() && this.state.pass.trim()) {
      const { error } = await Auth.signin(this.state.user, this.state.pass);
      if (error) {
        this.setState({ error });
      } else {
        this.props.history.push("/");
      }
    } else {
      this.setState({ error: "Name/password missing" });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="flex col signin-page">
          <form onSubmit={this.doSignin} className="flex col auth">
            <h1>
              <i className="fa fa-book"></i>&nbsp;Signin
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
                <i className="fa fa-times-circle"></i>&nbsp;{this.state.error}
              </p>
            ) : null}
            <button type="submit">SIGNIN</button>
            <h4>
              Not registered?<NavLink to="/signup">Signup</NavLink>
            </h4>
          </form>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(Signin);
