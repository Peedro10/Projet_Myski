import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
        withCredentials: true
      });
      setCurrentUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) {
      console.error("Error while logging in:", error.response?.data || "Unknown error");
      throw new Error(error.response?.data.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:8800/api/auth/logout", {}, {
        withCredentials: true
      });
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error while logging out:", error.response?.data || error.message);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/auth/checkAuth", {
        withCredentials: true
      });
      setCurrentUser(res.data.user);
    } catch (error) {
      console.error("Erreur lors de la vérification de l'authentification:", error.response?.data || error.message);
      setCurrentUser(null);
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
