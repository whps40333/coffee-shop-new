import React from "react";
import Navigation from "./Navigation";

import classes from "../../styles/UI/Header.module.css";

const MainHeader = (props) => {
  return (
    <header className={classes["main-header"]}>
      <a className={classes.main} href="main">
        Coffee Shop
      </a>
      <Navigation isLoggedIn={props.isLoggedIn} onLogout={props.onLogout} />
    </header>
  );
};

export default MainHeader;
