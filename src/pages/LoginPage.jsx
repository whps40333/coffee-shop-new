import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useContext,
} from "react";
import BlackCard from "../components/UI/Modals/BlcakCard";
import WhiteButton from "../components/UI/Buttons/WhiteButton";
import classes from "../styles/pages/LoginPage.module.css";
import AuthContext from "../context/auth-context";
import Input from "../components/UI/Inputs/input";
import coffeeLogo from "../images/coffee logo.png";
import coffeeShop from "../vedio/AnyConv.com__Coffee-Shop 2-1.mp4";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

function LoginPage(props) {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      // props.onLogin(emailState.value, passwordState.value);
      console.log(emailState.value, passwordState.value);
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.circle}>
          <img src={coffeeLogo} alt="coffee-logo" />
        </div>
        <BlackCard>
          <form className={classes.login} onSubmit={submitHandler}>
            <h2>咖啡收藏</h2>
            <Input
              ref={emailInputRef}
              id="email"
              label="E-Mail"
              type="email"
              isValid={emailIsValid}
              value={emailState.value}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
              placeholder="email"
            />
            {emailIsValid === false && <p>電子郵件格式不正確</p>}
            <Input
              ref={passwordInputRef}
              id="password"
              label="Password"
              type="password"
              isValid={passwordIsValid}
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
              placeholder="密碼"
            />
            {passwordIsValid === false && <p>密碼長度要超過6個字</p>}
            <div className={classes.actions}>
              <WhiteButton type="submit" className={classes.btn}>
                登入
              </WhiteButton>
            </div>
            <a href="register">前往註冊</a>
          </form>
        </BlackCard>
      </div>
      <video className={classes.vedio} autoPlay loop muted>
        <source src={coffeeShop} type="video/mp4" />
      </video>
    </>
  );
}

export default LoginPage;
