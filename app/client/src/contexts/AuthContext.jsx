import React, { createContext, useState, useContext } from "react";


// Buat context
const AuthContext = createContext();

// Provider untuk memberikan akses ke context
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk menggunakan context
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
