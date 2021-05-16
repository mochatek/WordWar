import { Route, Redirect } from "react-router-dom";
import Auth from "./auth";

export default class ProtectedRoute extends Route {
  render() {
    return Auth.is_authenticated ? super.render() : <Redirect to="/signin" />;
  }
}
