import React, { createContext, useState, useContext, useEffect } from "react";
import api  from "../api/api.js";


// Buat context
const AuthContext = createContext();

// Provider untuk memberikan akses ke context
const AuthProvider = ({ children }) => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const result = await api.getUserData();
        setIsLoggedIn(true);
        return result;
      } catch (error) {
        throw error; 
      }
    }
    fetchCurrentUser();

  }, [])


  const saveToken = (token) => {
    localStorage.setItem("token", token);
  }

  const login = (token) => {
    setIsLoggedIn(true);
    
    saveToken(token);

  };
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk menggunakan context
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
