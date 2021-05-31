import { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./services/ProtectedRoute";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./components/Home";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <ProtectedRoute path="/" exact={true} component={Home} />
          <Route path="/signin" exact={true} component={Signin} />
          <Route path="/signup" exact={true} component={Signup} />
        </Switch>
      </Router>
    );
  }
}
