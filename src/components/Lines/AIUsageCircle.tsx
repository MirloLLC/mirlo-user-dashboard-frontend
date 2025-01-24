import React from 'react';
import { Bot } from 'lucide-react';

interface AIUsageCircleProps {
  used: number;
  total: number;
}

const AIUsageCircle: React.FC<AIUsageCircleProps> = ({ used, total }) => {
  const percentage = (used / total) * 100;
  const circumference = 2 * Math.PI * 44;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-28 h-28">
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
          stroke="#FF6A1F"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-semibold mb-0.5">{used}</span>
        <span className="text-xs text-gray-500 whitespace-nowrap">de {total} min</span>
        <Bot className="w-5 h-5 mt-1 text-orange-500" />
      </div>
    </div>
  );
};

export default AIUsageCircle;