import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Pistes from "./pages/pistes/Pistes";
import Remontees from "./pages/remontees/Remontees";
import CommentairesPistes from "./pages/commentsPistes/CommentairesPistes";
import CommentairesRemontees from "./pages/commentsRemontees/CommentairesRemontees";
import Chats from "./pages/chats/Chats"; // Import Chats page
import Itineraires from "./pages/itineraires/Itineraires"; // Import Itineraires page
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import "./style.scss";

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Navbar />
      <Outlet />
    </div>
  );

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="pistes"
            element={
              <ProtectedRoute>
                <Pistes />
              </ProtectedRoute>
            }
          />
          <Route
            path="remontees"
            element={
              <ProtectedRoute>
                <Remontees />
              </ProtectedRoute>
            }
          />
          <Route
            path="commentaires_pistes"
            element={
              <ProtectedRoute>
                <CommentairesPistes />
              </ProtectedRoute>
            }
          />
          <Route
            path="commentaires_remontees"
            element={
              <ProtectedRoute>
                <CommentairesRemontees />
              </ProtectedRoute>
            }
          />
          <Route
            path="chats"
            element={
              <ProtectedRoute>
                <Chats />
              </ProtectedRoute>
            }
          />
          <Route
            path="itineraires"
            element={
              <ProtectedRoute>
                <Itineraires />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
