import React from 'react';
import { Calendar } from 'lucide-react';

const Plugins = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-2">Calendario</h2>
      <p className="text-gray-600 mb-6">Integra tu calendario y permítele al agente agendar reuniones</p>
      
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        <Calendar className="w-4 h-4" />
        Integrar Google Calendar
      </button>
    </div>
  );
};

export default Plugins;