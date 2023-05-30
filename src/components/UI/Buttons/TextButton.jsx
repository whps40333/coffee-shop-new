import classes from "../../../styles/TextButton.module.css";

const TextButton = (props) => {
  return (
    <button className={classes.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default TextButton;
