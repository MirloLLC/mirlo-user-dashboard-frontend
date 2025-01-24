import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface UserInfo {
  name: string;
  email: string;
}

interface UserContextType {
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo | null) => void;
  checkSession: () => Promise<void>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const checkSession = async () => {
    const sessionToken = localStorage.getItem('sessionToken');
    const redirectUri = `${window.location.origin}/authorization`;
    const authUrl = `https://auth.mirlo.mx/authorize?response_type=code&client_id=6lpzjlshAuGFMGHySB2hIsqFarSEWKXc&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=openid%20profile%20email`;

    if (!sessionToken) {
      setIsLoading(false);
      if (!location.pathname.startsWith('/authorization')) {
        window.location.href = authUrl;
      }
      return;
    }

    try {
      const response = await fetch('https://auth.mirlo.mx/userinfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Invalid token');
      }

      const userData = await response.json();
      setUserInfo({
        name: userData.name || 'Usuario',
        email: userData.email || ''
      });
      setIsLoading(false);

      // If we're on the home page or authorization page and the token is valid,
      // redirect to /lines
      if (location.pathname === '/' || location.pathname === '/authorization') {
        navigate('/lines');
      }
    } catch (error) {
      console.error('Error checking session:', error);
      localStorage.removeItem('sessionToken');
      setUserInfo(null);
      setIsLoading(false);
      if (!location.pathname.startsWith('/authorization')) {
        window.location.href = authUrl;
      }
    }
  };

  useEffect(() => {
    checkSession();
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, checkSession, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};