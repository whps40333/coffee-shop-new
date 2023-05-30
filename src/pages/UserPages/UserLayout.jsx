import React, { useState } from "react";
import FavoriteSection from "./FavroiteSection";
import WritingSection from "./WritingSection";
import CommentSection from "./CommentSection";
import NavBar from "../../components/UI/Navbars/Navbar";
import MainHeader from "../../components/header/MainHeader";

import classes from "../../styles/pages/UserPages/UserLayout.module.css";

function UserLayout(props) {
  const [activeSection, setActiveSection] = useState(null);

  const SectionToggler = (sectionName) => {
    setActiveSection(activeSection === sectionName ? null : sectionName);
  };

  return (
    <div>
      <MainHeader
        isLoggedIn={props.isAuthenticated}
        onLogout={props.onLogout}
      />
      <div className={classes.wrapper}>
        <NavBar onSectionToggle={SectionToggler} />
        {activeSection === "writing" && <WritingSection />}
        {activeSection === "comment" && <CommentSection />}
        {activeSection === "favorite" && <FavoriteSection />}
      </div>
    </div>
  );
}

export default UserLayout;
