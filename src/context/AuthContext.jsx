import { createContext, useEffect, useState } from "react";
//import {  getCurrentUserId } from "../services/token.service";
//import { getUser } from "../services/authService";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load authentication state on app start
  useEffect(() => {
    const savedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const savedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Save login result
  const saveLogin = async (token, rememberMe, userData = null) => {
    const storage = rememberMe ? localStorage : sessionStorage;

    setToken(token);
    storage.setItem("token", token);
    setIsAuthenticated(true);

    
    if (userData) {
      setCurrentUser(userData);
      storage.setItem("user", JSON.stringify(userData));
    }
    
    
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    setToken(null);
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ token, currentUser, isAuthenticated, saveLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
