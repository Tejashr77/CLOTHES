import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/client';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('zaqueen-token');
    if (token) {
      api.getProfile()
        .then(data => setUser(data))
        .catch(() => { localStorage.removeItem('zaqueen-token'); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await api.login({ email, password });
    localStorage.setItem('zaqueen-token', data.token);
    setUser(data);
    return data;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const data = await api.register({ name, email, password });
    localStorage.setItem('zaqueen-token', data.token);
    setUser(data);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('zaqueen-token');
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (body) => {
    const data = await api.updateProfile(body);
    localStorage.setItem('zaqueen-token', data.token);
    setUser(data);
    return data;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, isAuthenticated: !!user, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};
