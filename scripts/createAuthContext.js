const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '../../frontend/frontend/src/context');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const authContextCode = `import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI, getToken, removeToken } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(() => getToken());
  const [loading, setLoading] = useState(true);

  // Load user profile on mount if token exists
  const loadUser = useCallback(async () => {
    const existingToken = getToken();
    if (!existingToken) {
      setUser(null);
      setTokenState(null);
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.getMe();
      if (response && response.data) {
        setUser(response.data);
        setTokenState(existingToken);
      } else {
        removeToken();
        setUser(null);
        setTokenState(null);
      }
    } catch {
      removeToken();
      setUser(null);
      setTokenState(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();

    // Listen for session expiry event from API service
    const handleExpired = () => {
      setUser(null);
      setTokenState(null);
    };

    window.addEventListener('auth:expired', handleExpired);
    return () => window.removeEventListener('auth:expired', handleExpired);
  }, [loadUser]);

  const login = async (email, password) => {
    const res = await authAPI.login(email, password);
    setTokenState(res.token);
    setUser(res.user);
    return res;
  };

  const register = async (userData) => {
    const res = await authAPI.register(userData);
    setTokenState(res.token);
    setUser(res.user);
    return res;
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch {
      // Ignore network errors on logout
    } finally {
      setUser(null);
      setTokenState(null);
    }
  };

  const isAuthenticated = Boolean(token && user);
  const isAdmin = Boolean(isAuthenticated && user?.role === 'admin');

  const value = {
    user,
    token,
    isAuthenticated,
    isAdmin,
    loading,
    login,
    register,
    logout,
    refreshUser: loadUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
`;

const filePath = path.join(targetDir, 'AuthContext.jsx');
fs.writeFileSync(filePath, authContextCode, 'utf8');
console.log('Successfully created src/context/AuthContext.jsx!');
