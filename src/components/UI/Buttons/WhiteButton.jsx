import classes from "../../../styles/UI/WhiteButton.module.css";

const WhiteButton = (props) => {
  return (
    <button
      className={classes.button}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default WhiteButton;
