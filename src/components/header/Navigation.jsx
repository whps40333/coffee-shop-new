import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";
import classes from "../../styles/UI/Navigation.module.css";

const Navigation = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {authCtx.isLoggedIn && (
          <li>
            <a href="user">使用者功能</a>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <a href="main">店家清單</a>
          </li>
        )}

        {authCtx.isLoggedIn && (
          <li>
            <button onClick={authCtx.onLogout}>登出</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
