import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Authorization = () => {
  const navigate = useNavigate();
  const { checkSession } = useUser();
  const redirectUri = `${window.location.origin}/authorization`;

  useEffect(() => {
    const handleAuthorization = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');
        const errorDescription = urlParams.get('error_description');

        if (error || errorDescription) {
          console.error('OAuth error:', error, errorDescription);
          localStorage.removeItem('sessionToken');
          navigate('/');
          return;
        }

        if (!code) {
          console.error('No authorization code found in URL');
          localStorage.removeItem('sessionToken');
          navigate('/');
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

        const responseText = await tokenResponse.text();
        let tokenData;
        
        try {
          tokenData = JSON.parse(responseText);
        } catch (e) {
          console.error('Failed to parse token response:', responseText);
          throw new Error('Invalid token response format');
        }

        if (!tokenResponse.ok) {
          console.error('Token request failed:', {
            status: tokenResponse.status,
            statusText: tokenResponse.statusText,
            response: tokenData
          });
          throw new Error(`Token request failed: ${tokenResponse.status} ${tokenResponse.statusText}`);
        }

        if (!tokenData.access_token) {
          console.error('No access token in response:', tokenData);
          throw new Error('No access token received in response');
        }

        localStorage.setItem('sessionToken', tokenData.access_token);
        await checkSession();
        navigate('/lines');

      } catch (error) {
        console.error('Authorization error:', {
          message: error.message,
          stack: error.stack,
          error
        });
        localStorage.removeItem('sessionToken');
        navigate('/');
      }
    };

    handleAuthorization();
  }, [navigate, redirectUri, checkSession]);

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