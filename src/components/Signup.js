import { Fragment, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Auth from "../services/auth";
import Footer from "./Footer";

export default function Signup() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function changeHandler(event) {
    const name = event.target.name;
    const value = event.target.value.trim().toLowerCase();
    name === "user" ? setUser(value) : setPass(value);
  }

  async function signUpUser(event) {
    event.preventDefault();

    if (user.trim() && pass.trim()) {
      const { error: signup_error } = await Auth.signup(user, pass);
      if (signup_error) {
        setError(signup_error);
      } else {
        navigate("/signin");
      }
    } else {
      setError("Name/password missing");
    }
  }

  return (
    <Fragment>
      <div className="flex col signup-page">
        <form onSubmit={signUpUser} className="flex col auth">
          <h1>
            <i className="fa fa-book"></i>&nbsp;Signup
          </h1>
          <input
            type="text"
            name="user"
            placeholder="Player name"
            value={user}
            onChange={changeHandler}
          />
          <input
            type="password"
            name="pass"
            placeholder="Password"
            value={pass}
            onChange={changeHandler}
          />
          {error ? (
            <p className="error">
              <i className="fa fa-times-circle"></i>&nbsp;
              {error}
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
