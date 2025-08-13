import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import AuthPage from "./pages/auth/AuthPage.jsx";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/home" /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={token ? <Navigate to="/home" /> : <AuthPage />}
        />
        <Route
          path="/home"
          element={token ? <HomePage /> : <Navigate to="/auth" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
