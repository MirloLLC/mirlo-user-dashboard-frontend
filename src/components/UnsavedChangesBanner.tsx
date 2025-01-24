import React from 'react';
import { Save } from 'lucide-react';

interface UnsavedChangesBannerProps {
  onSave: () => void;
  isLoading?: boolean;
}

const UnsavedChangesBanner: React.FC<UnsavedChangesBannerProps> = ({ onSave, isLoading }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg transform transition-transform duration-200 z-50 lg:left-64">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-900">Tienes cambios sin guardar</p>
          <p className="text-sm text-gray-600">Guarda los cambios para activarlos</p>
        </div>
        <button
          onClick={onSave}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          {isLoading ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </div>
  );
};

export default UnsavedChangesBanner;