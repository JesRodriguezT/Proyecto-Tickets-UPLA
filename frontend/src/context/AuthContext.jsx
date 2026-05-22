import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(localStorage.getItem("username") || null);

  const handleLogin = (jwtToken, username) => {
    setToken(jwtToken);
    setUser(username);
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("username", username);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ token, user, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};