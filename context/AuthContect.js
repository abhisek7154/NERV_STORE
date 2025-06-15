// context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]); // Store all registered users
  const [user, setUser] = useState(null); // Logged in user
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const register = (userData) => {
    const existingUser = users.find((u) => u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'Email already exists' };
    }

    const newUser = {
      id: Date.now().toString(),
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password, // Store securely in real apps
    };

    setUsers((prev) => [...prev, newUser]);
    return { success: true };
  };

  const login = (email, password) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      setIsLoggedIn(true);
      return { success: true, user: foundUser };
    }

    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ users, user, isLoggedIn, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
