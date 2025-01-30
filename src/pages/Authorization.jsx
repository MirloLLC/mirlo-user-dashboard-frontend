import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Authorization = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const redirectUri = `${window.location.origin}/authorization`;
  const authUrl = `https://auth.mirlo.mx/authorize?response_type=code&client_id=6lpzjlshAuGFMGHySB2hIsqFarSEWKXc&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid%20profile%20email`;

  useEffect(() => {
    const handleAuthorization = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');
        const errorDescription = urlParams.get('error_description');

        if (error || errorDescription) {
          setError(errorDescription || 'Error de autorización');
          setTimeout(() => window.location.href = '/', 3000);
          return;
        }

        if (!code) {
          setError('No se encontró el código de autorización');
          setTimeout(() => window.location.href = '/', 3000);
          return;
        }

        const tokenResponse = await fetch('https://auth.mirlo.mx/oauth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            grant_type: 'authorization_code',
            client_id: '6lpzjlshAuGFMGHySB2hIsqFarSEWKXc',
            client_secret: 'Mf7BnFBK7IBmt1VeShlKaKPL4OP8enWcdncvxBehzT7rx8K6Gndb6w0wqiSN9SFV',
            code: code,
            redirect_uri: redirectUri,
          }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
          setError('Error al obtener el token de acceso');
          setTimeout(() => window.location.href = '/', 3000);
          return;
        }

        if (!tokenData.access_token) {
          setError('No se recibió el token de acceso');
          setTimeout(() => window.location.href = '/', 3000);
          return;
        }

        // Guardar el token y redirigir
        localStorage.setItem('sessionToken', tokenData.access_token);
        navigate('/lines');

      } catch (error) {
        console.error('Error en el proceso de autorización:', error);
        setError('Error inesperado durante la autorización');
        setTimeout(() => window.location.href = '/', 3000);
      }
    };

    handleAuthorization();
  }, [navigate, redirectUri]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error de autorización</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Redirigiendo al inicio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Autorizando...</p>
      </div>
    </div>
  );
};

export default Authorization;