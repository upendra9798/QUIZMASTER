import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/home/HomePage.jsx";
import AuthPage from "./pages/auth/AuthPage.jsx";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Sync token changes to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        {/* Root path redirects based on auth */}
        <Route
          path="/"
          element={token ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />

        {/* Login route */}
        <Route
          path="/login"
          element={token ? <Navigate to="/home" /> : <AuthPage isSignUp={false} setToken={setToken} />}
        />

        {/* Signup route */}
        <Route
          path="/signup"
          element={token ? <Navigate to="/home" /> : <AuthPage isSignUp={true} setToken={setToken} />}
        />

        {/* Legacy auth path (optional) */}
        <Route
          path="/auth"
          element={token ? <Navigate to="/home" /> : <AuthPage setToken={setToken} />}
        />

        {/* Home page */}
        <Route
          path="/home"
          element={token ? <HomePage /> : <Navigate to="/login" />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
