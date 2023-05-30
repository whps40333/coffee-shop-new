import React from "react";
import classes from "../../../styles/pages/UserPages/Comments/Comments.module.css";

const Restaurant = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>{props.title}</div>
      <div className={classes.visitDate}>{props.visitDate}</div>
      <div className={classes.comment}>{props.comment}</div>
    </div>
  );
};

export default Restaurant;
