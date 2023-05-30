import React from "react";
import StoreSection from "../components/stores/StoreSection";
import MainHeader from "../components/header/MainHeader";

function MainPage(props) {
  return (
    <>
      <MainHeader
        isLoggedIn={props.isAuthenticated}
        onLogout={props.onLogout}
      />
      <div>
        <StoreSection />
      </div>
    </>
  );
}

export default MainPage;
