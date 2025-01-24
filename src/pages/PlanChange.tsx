import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import PlanOption from '../components/Plans/PlanOption';

interface Plan {
  id: number;
  data: number;
  minutes: number;
  sms: number;
  price: number;
  isBestValue?: boolean;
  features: string[];
  isCurrent?: boolean;
  hasAIAgent?: boolean;
}

const PlanChange: React.FC = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const plans: Plan[] = [
    {
      id: 4,
      data: 15,
      minutes: 1000,
      sms: 500,
      price: 499,
      hasAIAgent: true,
      features: [
        'Redes sociales ilimitadas',
        'WhatsApp ilimitado',
        'Llamadas ilimitadas a cualquier compañía',
        'Roaming en América',
        'Netflix incluido',
        'Agente Personal con 10 minutos mensuales',
        'Configuración personalizada del Agente'
      ]
    },
    {
      id: 3,
      data: 7,
      minutes: 500,
      sms: 200,
      price: 299,
      isBestValue: true,
      features: [
        'Redes sociales ilimitadas',
        'WhatsApp ilimitado',
        'Llamadas ilimitadas a la misma compañía',
        'Roaming en USA y Canadá'
      ]
    },
    {
      id: 2,
      data: 5,
      minutes: 400,
      sms: 150,
      price: 249,
      isCurrent: true,
      features: [
        'Redes sociales ilimitadas',
        'WhatsApp ilimitado',
        'Llamadas ilimitadas a la misma compañía',
        'Roaming nacional'
      ]
    },
    {
      id: 1,
      data: 3,
      minutes: 300,
      sms: 100,
      price: 199,
      features: [
        'Redes sociales ilimitadas',
        'WhatsApp ilimitado',
        'Llamadas ilimitadas a la misma compañía'
      ]
    }
  ];

  return (
    <div className="lg:ml-64 p-4 md:p-8">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver
      </button>

      <div className="flex justify-between items-center mb-8">
        <Header 
          title="Cambiar plan" 
          subtitle={`Número: ${number}`}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-6">Planes disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanOption
              key={plan.id}
              data={plan.data}
              minutes={plan.minutes}
              sms={plan.sms}
              price={plan.price}
              selected={selectedPlan === plan.id}
              onSelect={() => setSelectedPlan(plan.id)}
              isBestValue={plan.isBestValue}
              isCurrent={plan.isCurrent}
              hasAIAgent={plan.hasAIAgent}
              features={plan.features}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {/* Handle plan change */}}
            disabled={!selectedPlan}
            className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar cambio
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanChange;