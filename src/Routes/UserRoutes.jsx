import { Routes, Route } from "react-router-dom";

import UserLayout from "../pages/UserPages/UserLayout";

function UserRoutes(props) {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />} />
    </Routes>
  );
}

export default UserRoutes;
