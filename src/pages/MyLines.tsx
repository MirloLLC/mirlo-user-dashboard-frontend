import React from 'react';
import Header from '../components/Header';
import LinesList from '../components/Lines/LinesList';
import DevicesList from '../components/Lines/DevicesList';
import UserProfile from '../components/UserProfile';

const MyLines = () => {
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