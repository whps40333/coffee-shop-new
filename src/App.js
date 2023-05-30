import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Routes/Router";
import FavoriteProvider from "./context/FavoriteProvider";
import { AuthContextProvider } from "./context/auth-context";

function App() {
  return (
    <div className="App">
      <FavoriteProvider>
        <BrowserRouter>
          <AuthContextProvider>
            <Router />
          </AuthContextProvider>
        </BrowserRouter>
      </FavoriteProvider>
    </div>
  );
}

export default App;
