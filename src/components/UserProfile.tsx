import React from 'react';
import { useUser } from '../contexts/UserContext';

const UserProfile: React.FC = () => {
  const { userInfo } = useUser();

  if (!userInfo) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-end">
        <span className="font-medium">{userInfo.name}</span>
        <span className="text-sm text-gray-500">{userInfo.email}</span>
      </div>
      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
        <span className="text-gray-600 font-medium">
          {userInfo.name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
    </div>
  );
};

export default UserProfile;