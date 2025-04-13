import React, { createContext, useState, useContext } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  const login = async (userData) => {
    try {
      console.log('Attempting to login with data:', userData); 
      const response = await api.post('/auth/login', userData);
      console.log('Login response:', response); 

      if (response.token) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token); 
      } else {
        console.error('Login failed: ', response.message);
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login: ', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);

      if (response.token) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token); 
      } else {
        console.error('Registration failed: ', response.message);
      }
    } catch (error) {
      console.error('Error during registration: ', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
