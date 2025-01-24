import React from 'react';
import { MessageSquare, Filter, Bell, Bot } from 'lucide-react';

const AgentDescription = () => {
  return (
    <div className="bg-orange-50/50 rounded-lg p-6 shadow-sm mb-6">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
          <Bot className="w-7 h-7 text-orange-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Tu asistente personal inteligente</h2>
          <p className="text-gray-600">
            Optimiza tu tiempo y nunca pierdas una llamada importante. Tu asistente personal con IA se encarga de gestionar tus llamadas de forma inteligente.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="font-medium">Atención 24/7</h3>
          <p className="text-sm text-gray-600">
            Responde llamadas cuando no estés disponible con conversaciones naturales
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <Filter className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="font-medium">Priorización inteligente</h3>
          <p className="text-sm text-gray-600">
            Transfiere solo las llamadas importantes según tus reglas
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <Bell className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="font-medium">Resúmenes detallados</h3>
          <p className="text-sm text-gray-600">
            Recibe un resumen claro de cada conversación en tiempo real
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentDescription;