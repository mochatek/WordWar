import { Navigate } from "react-router-dom";
import Auth from "./auth";

export default function ProtectedRoute({ children }) {
  return Auth.getUser() ? children : <Navigate to="/signin" />;
}
