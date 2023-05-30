import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/auth-context";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import RegisterPage from "../pages/RegisterPage";
import UserLayout from "../pages/UserPages/UserLayout";

function Router() {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={!authCtx.isLoggedIn && <LoginPage onLogin={authCtx.onLogin} />}
      />
      <Route
        path="/main"
        element={
          authCtx.isLoggedIn && (
            <MainPage
              isAuthenticated={authCtx.isLoggedIn}
              onLogout={authCtx.onLogout}
            />
          )
        }
      />
      <Route
        path="/register"
        element={!authCtx.isLoggedIn && <RegisterPage />}
      />
      <Route
        path="/user/*"
        element={
          authCtx.isLoggedIn && (
            <Routes>
              <Route
                path="/"
                element={
                  <UserLayout
                    isAuthenticated={authCtx.isLoggedIn}
                    onLogout={authCtx.onLogout}
                  />
                }
              />
            </Routes>
          )
        }
      />
    </Routes>
  );
}

export default Router;
