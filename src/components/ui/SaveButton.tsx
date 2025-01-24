import React from 'react';
import { Save } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SaveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  hasChanges?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ isLoading, hasChanges, className, ...props }) => {
  return (
    <button
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
        hasChanges 
          ? "bg-brand text-white hover:bg-orange-600" 
          : "bg-gray-100 text-gray-400",
        isLoading && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={isLoading || !hasChanges}
      {...props}
    >
      <Save className="w-4 h-4" />
      {isLoading ? "Guardando..." : "Guardar cambios"}
    </button>
  );
}

export default SaveButton;