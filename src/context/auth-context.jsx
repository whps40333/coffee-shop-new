import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    // Set up the onAuthStateChanged listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, update the state
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "1");
      } else {
        // User is signed out, update the state
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const logoutHandler = () => {
    try {
      const auth = getAuth();
      signOut(auth);
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const loginHandler = async (email, password) => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isLoggedIn", "1");
      setIsLoggedIn(true);
      navigate("main");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
