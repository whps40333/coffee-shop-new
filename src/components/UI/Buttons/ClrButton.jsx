import classes from "../../../styles/ClrButton.module.css";

const Clrbutton = (props) => {
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

export default Clrbutton;
