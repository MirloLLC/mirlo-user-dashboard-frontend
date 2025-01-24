import React from 'react';
import { cn } from '../utils/cn';

interface ModifiedSectionProps {
  children: React.ReactNode;
  isModified?: boolean;
}

const ModifiedSection: React.FC<ModifiedSectionProps> = ({ children, isModified }) => {
  return (
    <div className={cn(
      'relative transition-all duration-200',
      isModified && 'before:absolute before:inset-0 before:border-2 before:border-brand/20 before:rounded-lg before:pointer-events-none'
    )}>
      {isModified && (
        <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-brand/10 text-brand rounded-full text-xs font-medium">
          Modificado
        </div>
      )}
      {children}
    </div>
  );
};

export default ModifiedSection;