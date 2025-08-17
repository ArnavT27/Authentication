import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Provider component
export const AppProvider = ({ children }) => {
  // User state
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
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
      
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

  // Login function
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
        email,
        password
      }, {
        withCredentials: true
      });

      if (response.data.status === 'success') {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true, data: response.data };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.post('http://127.0.0.1:8000/api/auth/signup', userData, {
        withCredentials: true
      });

      if (response.data.status === 'success') {
        setUser(response.data.data.User);
        setIsAuthenticated(true);
        return { success: true, data: response.data };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Signup failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Verify email function
  const verifyEmail = async (code) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.post('http://127.0.0.1:8000/api/auth/verify-email', {
        code
      }, {
        withCredentials: true
      });

      if (response.data.status === 'success') {
        return { success: true, data: response.data };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Email verification failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/auth/logout', {}, {
        withCredentials: true
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Clear local state regardless of server response
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
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
    
    // Functions
    login,
    signup,
    verifyEmail,
    logout,
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