import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlackCard from "../components/UI/Modals/BlcakCard";
import WhiteButton from "../components/UI/Buttons/WhiteButton";
import classes from "../styles/pages/LoginPage.module.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import coffeeLogo from "../images/coffee logo.png";
import Input from "../components/UI/Inputs/input";
import coffeeShop from "../vedio/AnyConv.com__Coffee-Shop 2-1.mp4";

function Register() {
  const [enterEmail, setEnterEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enterPassword, setEnterPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const navigate = useNavigate();

  const emailChangeHandler = (event) => {
    setEnterEmail(event.target.value);
    setFormIsValid(
      event.target.value.includes("@") && enterPassword.trim().length < 6
    );
  };

  const passwordChangeHandler = (event) => {
    setEnterPassword(event.target.value);
    setFormIsValid(
      event.target.value.trim().length < 6 && enterEmail.includes("@")
    );
  };
  const validateEmailHandler = () => {
    setEmailIsValid(enterEmail.includes("@"));
  };
  const validatePasswordHandler = () => {
    setPasswordIsValid(enterPassword.trim().length < 6);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        enterEmail,
        enterPassword
      );
      navigate("/main");
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
    console.log(enterEmail, enterPassword);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.circle}>
        <img src={coffeeLogo} alt="coffee-logo" />
      </div>
      <BlackCard>
        <form className={classes.login} onSubmit={submitHandler}>
          <h2>咖啡收藏</h2>
          <div
            className={`${classes.control} ${
              emailIsValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="email"></label>
            <Input
              type="email"
              id="email"
              placeholder="帳號(含有@的電子信箱)"
              value={enterEmail}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
          </div>
          {emailIsValid === false && <p>電子郵件格式不正確</p>}
          <div
            className={`${classes.control} ${
              passwordIsValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="password"></label>
            <Input
              type="password"
              id="password"
              placeholder="密碼(由英數組成至少7個字)"
              value={enterPassword}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </div>
          {passwordIsValid === false && <p>密碼長度要超過6個字</p>}
          <div className={classes.actions}>
            <WhiteButton type="submit" disabled={!formIsValid}>
              註冊
            </WhiteButton>
          </div>
        </form>
      </BlackCard>
      <video className={classes.vedio} autoPlay loop muted>
        <source src={coffeeShop} type="video/mp4" />
      </video>
    </div>
  );
}

export default Register;
