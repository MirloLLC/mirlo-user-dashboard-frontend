import React, { useState } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState({
    sms: false,
    email: false,
    slack: false
  });
  const [email, setEmail] = useState('');
  const [slackUrl, setSlackUrl] = useState('');

  const handleCheckboxChange = (type: 'sms' | 'email' | 'slack') => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-2">Notificaciones</h2>
      <p className="text-gray-600 mb-6">Recibe un resumen de tus conversaciones</p>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={() => handleCheckboxChange('sms')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">SMS</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => handleCheckboxChange('email')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Email</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications.slack}
              onChange={() => handleCheckboxChange('slack')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Slack</span>
          </div>
        </div>

        {notifications.email && (
          <input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        )}

        {notifications.slack && (
          <input
            type="url"
            placeholder="Ingresa la URL del canal de Slack"
            value={slackUrl}
            onChange={(e) => setSlackUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        )}
      </div>
    </div>
  );
};

export default Notifications;