import React from 'react';
import { cn } from '../../utils/cn';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn('flex gap-4', className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            'flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border transition-colors',
            value === option.value
              ? 'border-brand text-brand bg-orange-50'
              : 'border-gray-200 text-gray-700 hover:bg-gray-50'
          )}
        >
          <input
            type="radio"
            className="hidden"
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
          />
          <span className="text-sm font-medium">{option.label}</span>
        </label>
      ))}
    </div>
  );
};