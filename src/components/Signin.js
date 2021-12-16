import { Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Auth from "../services/auth";
import Footer from "./Footer";

export default function Signin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function changeHandler(event) {
    const name = event.target.name;
    const value = event.target.value.trim().toLowerCase();
    name === "user" ? setUser(value) : setPass(value);
  }

  async function signInUser(event) {
    event.preventDefault();

    if (user.trim() && pass.trim()) {
      const { error: signin_error } = await Auth.signin(user, pass);
      if (signin_error) {
        setError(signin_error);
      } else {
        navigate("/");
      }
    } else {
      setError("Name/password missing");
    }
  }

  return (
    <Fragment>
      <div className="flex col signin-page">
        <form onSubmit={signInUser} className="flex col auth">
          <h1>
            <i className="fa fa-book"></i>&nbsp;Signin
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
              <i className="fa fa-times-circle"></i>&nbsp;{error}
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
