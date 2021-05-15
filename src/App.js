import { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import User from "./components/User";

export default class App extends Component {
  render() {
    return (
      <Router>
        <ul>
          <li>
            <Link to="/signin">Signin</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/user">Users</Link>
          </li>
        </ul>

        <Switch>
          <Route path={["/", "/signin"]} exact={true}>
            <Signin />
          </Route>
          <Route path="/signup" exact={true}>
            <Signup />
          </Route>
          <Route path="/user" exact={true}>
            <User />
          </Route>
        </Switch>
      </Router>
    );
  }
}
