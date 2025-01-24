import React from 'react';
import { Bot } from 'lucide-react';

interface AIUsageSummaryProps {
  used: number;
  total: number;
}

const AIUsageSummary: React.FC<AIUsageSummaryProps> = ({ used, total }) => {
  const remaining = total - used;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center gap-3 mb-2">
        <Bot className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-medium">Uso del Agente</h3>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-semibold text-orange-500">{remaining}</span>
          <span className="text-gray-600">minutos disponibles</span>
        </div>
        <span className="text-gray-400 sm:ml-2">
          de {total} minutos totales
        </span>
      </div>
      <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-orange-500 rounded-full transition-all duration-300"
          style={{ width: `${(used / total) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default AIUsageSummary;