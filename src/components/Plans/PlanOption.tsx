import React from 'react';
import { Phone, MessageSquare, Wifi, Check, Zap, Bot } from 'lucide-react';
import { cn } from '../../utils/cn';

interface PlanOptionProps {
  data: number;
  minutes: number;
  sms: number;
  price: number;
  selected?: boolean;
  onSelect: () => void;
  isBestValue?: boolean;
  isCurrent?: boolean;
  features?: string[];
  hasAIAgent?: boolean;
}

const PlanOption: React.FC<PlanOptionProps> = ({
  data,
  minutes,
  sms,
  price,
  selected,
  onSelect,
  isBestValue,
  isCurrent,
  features = [],
  hasAIAgent
}) => {
  return (
    <div
      className={cn(
        'border-2 rounded-lg p-4 transition-all relative',
        selected ? 'border-brand shadow-md' : 'border-gray-200',
        !isCurrent && 'hover:border-gray-300 cursor-pointer',
        isCurrent && 'opacity-75 cursor-not-allowed',
        isCurrent && !selected && 'border-blue-500'
      )}
      onClick={() => !isCurrent && onSelect()}
    >
      {/* Badges */}
      <div className="absolute -top-2.5 left-0 right-0 flex justify-center gap-2">
        {isBestValue && (
          <span className="bg-brand text-white text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Más popular
          </span>
        )}
        {isCurrent && (
          <span className="bg-blue-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
            Plan actual
          </span>
        )}
        {hasAIAgent && (
          <span className="bg-mint text-primary text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
            <Bot className="w-3 h-3" />
            Incluye Agente Personal con AI
          </span>
        )}
      </div>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Plan {data}GB</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-brand">${price}</span>
          <span className="text-sm text-gray-500">/mes</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-gray-50 p-2 rounded-lg">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center">
              <Wifi className="w-3 h-3 text-brand" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-900">{data}GB</p>
              <p className="text-[10px] text-gray-500">Datos</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-2 rounded-lg">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center">
              <Phone className="w-3 h-3 text-brand" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-900">{minutes}</p>
              <p className="text-[10px] text-gray-500">Min</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-2 rounded-lg">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center">
              <MessageSquare className="w-3 h-3 text-brand" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-900">{sms}</p>
              <p className="text-[10px] text-gray-500">SMS</p>
            </div>
          </div>
        </div>
      </div>

      <ul className="space-y-2 mb-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-brand" />
            {feature}
          </li>
        ))}
      </ul>

      <button
        className={cn(
          "w-full py-2 rounded-lg text-center transition-colors flex items-center justify-center gap-2",
          selected 
            ? "bg-brand text-white hover:bg-brand/90"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200",
          isCurrent && "opacity-50 cursor-not-allowed"
        )}
        disabled={isCurrent}
      >
        {selected ? (
          <>
            <Check className="w-4 h-4" />
            SELECCIONADO
          </>
        ) : isCurrent ? 'PLAN ACTUAL' : 'SELECCIONAR'}
      </button>
    </div>
  );
};

export default PlanOption;