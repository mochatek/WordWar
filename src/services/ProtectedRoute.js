import { Route, Redirect } from "react-router-dom";
import Auth from "./auth";

export default class ProtectedRoute extends Route {
  render() {
    return Auth.getUser() ? super.render() : <Redirect to="/signin" />;
  }
}
