import React from 'react';
import { ArrowRight, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import DataUsageCircle from './DataUsageCircle';
import AIUsageCircle from './AIUsageCircle';

interface LineCardProps {
  number: string;
  plan: string;
  dataUsed: number;
  dataTotal: number;
  aiMinutesUsed: number;
  aiMinutesTotal: number;
  status: string;
  hasAIAgent: boolean;
  isAIConfigured: boolean;
}

const LineCard: React.FC<LineCardProps> = ({
  number,
  plan,
  dataUsed,
  dataTotal,
  aiMinutesUsed,
  aiMinutesTotal,
  status,
  hasAIAgent,
  isAIConfigured
}) => {
  const formattedNumber = number.replace(/\s+/g, '');
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">{number}</h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm">SIM</span>
            <span className="text-sm text-green-500">• {status}</span>
          </div>
          <Link 
            to={`/lines/${formattedNumber}/recharge`}
            className="inline-flex px-4 py-2 bg-[#0F1822] text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
          >
            RECARGAR
          </Link>
        </div>
        <div className="flex items-start gap-4 w-full sm:w-auto justify-center">
          <div>
            <DataUsageCircle used={dataUsed} total={dataTotal} />
            <Link 
              to={`/lines/${formattedNumber}`}
              className="mt-2 text-xs text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1"
            >
              Ver detalle
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {hasAIAgent && (
            <div>
              <AIUsageCircle used={aiMinutesUsed} total={aiMinutesTotal} />
              <Link 
                to="/agent/events"
                className="mt-2 text-xs text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1"
              >
                Ver eventos
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <span className="text-lg font-medium">{plan}</span>
        {hasAIAgent && (
          <Link to="/agent">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors hover:opacity-80 ${
              isAIConfigured 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              <Bot className="w-4 h-4" />
              <span className="text-sm font-medium">
                {isAIConfigured ? 'Agente Activo' : 'Agente Sin Configurar'}
              </span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LineCard;