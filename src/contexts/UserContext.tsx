import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

// Cache para almacenar la última verificación exitosa
const SESSION_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutos
let lastSuccessfulCheck = 0;

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const checkSession = useCallback(async () => {
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

    // Verificar si necesitamos hacer una nueva petición
    const now = Date.now();
    if (userInfo && now - lastSuccessfulCheck < SESSION_CHECK_INTERVAL) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://auth.mirlo.mx/userinfo', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Si es un error de rate limit, mantener la sesión activa
        if (response.status === 429) {
          if (userInfo) {
            setIsLoading(false);
            return;
          }
        }

        const errorText = await response.text();
        throw new Error(`Invalid token: ${response.status} - ${errorText}`);
      }

      const userData = await response.json();

      if (!userData || typeof userData !== 'object') {
        throw new Error('Invalid user data format');
      }

      setUserInfo({
        name: userData.name || 'Usuario',
        email: userData.email || ''
      });
      
      // Actualizar timestamp de última verificación exitosa
      lastSuccessfulCheck = now;
      
      setIsLoading(false);

      if (location.pathname === '/' || location.pathname === '/authorization') {
        navigate('/lines');
      }
    } catch (error) {
      console.error('Error checking session:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        error
      });
      
      // Si hay un error que no sea de rate limit, limpiar el state
      if (!(error instanceof Error && error.message.includes('429'))) {
        setUserInfo(null);
      }
      
      setIsLoading(false);
      
      if (!location.pathname.startsWith('/authorization')) {
        window.location.href = authUrl;
      }
    }
  }, [location.pathname, navigate, userInfo]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

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