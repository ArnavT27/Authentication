import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '../utils/cookies';
const AppContext = createContext();


// Provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Check authentication status
  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const tokenCookie=getCookie("token");
      if (!tokenCookie) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      // Verify token with server
      const response = await axios.get('http://127.0.0.1:8000/api/auth/check-auth', {
        withCredentials: true
      });

      if (response.data.status === 'success') {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  

 

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  // Get user data
  const getUser = () => {
    return user;
  };

  // Check if user is verified
  const isUserVerified = () => {
    return user?.isVerified || false;
  };

  // Context value
  const value = {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    setIsLoading,
    setUser,
    setIsAuthenticated,
    setError,
    
    // Functions
  
    checkAuthStatus,
    clearError,
    getUser,
    isUserVerified,
    
    // Utility functions
    hasToken: () => {
      const cookies = document.cookie.split(';');
      return cookies.some(cookie => cookie.trim().startsWith('token='));
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;