import React from 'react';
import { Switch } from '../ui/Switch';

interface AgentToggleProps {
  isActive: boolean;
  onChange: (active: boolean) => void;
  isLoading?: boolean;
}

const AgentToggle: React.FC<AgentToggleProps> = ({ isActive, onChange, isLoading }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Estado del Agente</h3>
          <p className="text-gray-600">
            {isActive 
              ? 'Tu agente está activo y atendiendo llamadas' 
              : 'Activa tu agente para comenzar a recibir llamadas'}
          </p>
        </div>
        <div className="flex items-start sm:items-center">
          <Switch
            checked={isActive}
            onCheckedChange={onChange}
            disabled={isLoading}
            size="lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AgentToggle;