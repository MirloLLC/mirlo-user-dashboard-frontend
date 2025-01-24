import React from 'react';
import { cn } from '../../utils/cn';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, className, ...props }) => {
  return (
    <label className={cn('flex items-center gap-2 cursor-pointer', className)}>
      <input
        type="checkbox"
        className="w-4 h-4 text-brand border-gray-300 rounded focus:ring-brand"
        {...props}
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
};