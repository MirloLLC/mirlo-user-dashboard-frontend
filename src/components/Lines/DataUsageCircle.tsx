import React from 'react';

interface DataUsageCircleProps {
  used: number;
  total: number;
}

const DataUsageCircle: React.FC<DataUsageCircleProps> = ({ used, total }) => {
  const percentage = (used / total) * 100;
  // Increased radius for larger circle
  const circumference = 2 * Math.PI * 44;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    // Increased container size
    <div className="relative w-28 h-28">
      {/* Increased SVG size */}
      <svg className="transform -rotate-90 w-28 h-28">
        {/* Background circle */}
        <circle
          cx="56"
          cy="56"
          r="44"
          stroke="#E5E7EB"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
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
        <span className="text-2xl font-semibold mb-0.5">{used}</span>
        <span className="text-xs text-gray-500 whitespace-nowrap">de {total} GB</span>
      </div>
    </div>
  );
};

export default DataUsageCircle;