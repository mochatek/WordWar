import { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProtectedRoute from "./services/ProtectedRoute";
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
          <Route path={["/", "/signin"]} exact={true} component={Signin} />
          <Route path="/signup" exact={true} component={Signup} />
          <ProtectedRoute path="/user" exact={true} component={User} />
        </Switch>
      </Router>
    );
  }
}
