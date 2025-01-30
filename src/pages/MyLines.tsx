import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LinesList from '../components/Lines/LinesList';
import DevicesList from '../components/Lines/DevicesList';
import UserProfile from '../components/UserProfile';
import { useUser } from '../contexts/UserContext';

const MyLines = () => {
  const navigate = useNavigate();
  const { checkSession } = useUser();

  useEffect(() => {
    const verifySession = async () => {
      try {
        await checkSession();
      } catch (error) {
        console.error('Session verification failed:', error);
        navigate('/');
      }
    };

    verifySession();
  }, [checkSession, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:ml-64 p-4 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <Header title="Mis líneas" />
          <UserProfile />
        </div>
        <div className="space-y-8">
          <LinesList />
          <DevicesList />
        </div>
      </div>
    </div>
  );
};

export default MyLines;