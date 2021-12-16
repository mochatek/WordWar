import { HashRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./services/ProtectedRoute";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./components/Home";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </HashRouter>
  );
}
