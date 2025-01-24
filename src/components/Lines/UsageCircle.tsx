import React from 'react';

interface UsageCircleProps {
  title: string;
  used: number;
  total: number;
  unit: string;
}

const UsageCircle: React.FC<UsageCircleProps> = ({ 
  title, 
  used, 
  total,
  unit
}) => {
  const percentage = (used / total) * 100;
  const circumference = 2 * Math.PI * 44;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28 mb-2">
        <svg className="transform -rotate-90 w-28 h-28">
          <circle
            cx="56"
            cy="56"
            r="44"
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="56"
            cy="56"
            r="44"
            stroke="#22C55E"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold">{used}</span>
          <span className="text-xs text-gray-500">
            de {total}
          </span>
        </div>
      </div>
      <div className="text-center">
        <span className="text-sm text-gray-700">
          {title}
          {unit !== 'GB' && ` (${unit})`} disponibles
        </span>
      </div>
    </div>
  );
};

export default UsageCircle;