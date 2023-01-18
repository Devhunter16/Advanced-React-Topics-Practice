import React, { useContext } from "react";
import AuthContext from "../store/auth-context";
import classes from "./Navigation.module.css";

// With useContext we have access our context object (see auth-context.js) so we can then
// use ctx to access our prop within that context object (the .isLoggedIn part of ctx.isLoggedIn).
const Navigation = () => {
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
