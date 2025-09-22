import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Create the context
export const AppContext = React.createContext();

// Create the provider component
export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useLocalStorage('documents', []);
  const [users, setUsers] = useLocalStorage('users', []);
  const [settings, setSettings] = useLocalStorage('settings', {});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPreviewFile, setCurrentPreviewFile] = useState(null);

  useEffect(() => {
    // Check for existing authentication on app load
    const user = localStorage.getItem('currentUser');
    const token = localStorage.getItem('authToken');
    
    if (user && token) {
      setCurrentUser(JSON.parse(user));
      setAuthToken(token);
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    // Store authentication data
    setAuthToken(token);
    setCurrentUser(userData);
    setIsAuthenticated(true);
    
    // Save to localStorage for persistence
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    // Clear authentication data
    setCurrentUser(null);
    setAuthToken(null);
    setIsAuthenticated(false);
    
    // Clear from localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
  };

  const value = {
    currentUser,
    authToken,
    isAuthenticated,
    loading,
    login,
    logout,
    documents,
    setDocuments,
    users,
    setUsers,
    settings,
    setSettings,
    sidebarCollapsed,
    setSidebarCollapsed,
    currentPreviewFile,
    setCurrentPreviewFile
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}