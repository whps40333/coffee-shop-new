import classes from "../../../styles/UI/BlackCard.module.css";

const BlackCard = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default BlackCard;
