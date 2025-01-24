import React from 'react';
import { Phone, MessageSquare, CreditCard, Zap, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

interface RechargeOptionProps {
  data: number;
  days: number;
  minutes: number;
  sms: number;
  price: number;
  selected?: boolean;
  onSelect: () => void;
  color?: string;
  isBestValue?: boolean;
  savings?: number;
}

const RechargeOption: React.FC<RechargeOptionProps> = ({
  data,
  days,
  minutes,
  sms,
  price,
  selected,
  onSelect,
  color = 'rgb(51, 153, 153)',
  isBestValue,
  savings
}) => {
  return (
    <div
      className={cn(
        'border-2 rounded-lg p-4 cursor-pointer transition-all relative',
        selected ? 'border-brand shadow-md' : 'border-gray-200 hover:border-gray-300'
      )}
      onClick={onSelect}
      style={{ borderColor: selected ? color : undefined }}
    >
      {isBestValue && (
        <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2">
          <span className="bg-brand text-white text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Mejor valor
          </span>
        </div>
      )}
      
      <div className="mb-3">
        <h3 className="text-lg font-semibold" style={{ color }}>
          {data} GB - {days} días
        </h3>
        {savings && (
          <span className="text-xs text-green-600 font-medium">
            Ahorras {savings}%
          </span>
        )}
      </div>
      
      <div className="space-y-2 mb-4">
        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-2">
          {/* Datos */}
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                <svg className="w-3 h-3" style={{ color }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                  <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900">{data}GB</p>
                <p className="text-[10px] text-gray-500">Datos</p>
              </div>
            </div>
          </div>

          {/* Minutos */}
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                <Phone className="w-3 h-3" style={{ color }} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900">{minutes}</p>
                <p className="text-[10px] text-gray-500">Min</p>
              </div>
            </div>
          </div>

          {/* SMS */}
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                <MessageSquare className="w-3 h-3" style={{ color }} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900">{sms}</p>
                <p className="text-[10px] text-gray-500">SMS</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-gray-500" />
            <span className="text-base font-semibold">${price.toFixed(2)}</span>
          </div>
          <span className="text-xs text-gray-500">${(price/days).toFixed(2)}/día</span>
        </div>
      </div>

      <button
        className={cn(
          "w-full py-1.5 rounded-lg text-center transition-colors flex items-center justify-center gap-2 text-sm",
          selected 
            ? "bg-brand text-white hover:bg-brand/90"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        )}
      >
        {selected ? (
          <>
            <Check className="w-3 h-3" />
            SELECCIONADO
          </>
        ) : 'RECARGAR'}
      </button>
    </div>
  );
};

export default RechargeOption;