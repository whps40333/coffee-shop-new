import TextButton from "../Buttons/TextButton";
import classes from "../../../styles/UI/Navbar.module.css";

const NavBar = (props) => {
  const handleButtonClick = (sectionName) => {
    props.onSectionToggle(sectionName);
  };

  return (
    <div className={classes.wrapper}>
      <TextButton
        className={classes.button}
        onClick={() => handleButtonClick("writing")}
      >
        撰寫評論
      </TextButton>
      <TextButton
        className={classes.button}
        onClick={() => handleButtonClick("comment")}
      >
        查看評論
      </TextButton>
      <TextButton
        className={classes.button}
        onClick={() => handleButtonClick("favorite")}
      >
        查看收藏
      </TextButton>
    </div>
  );
};

export default NavBar;
