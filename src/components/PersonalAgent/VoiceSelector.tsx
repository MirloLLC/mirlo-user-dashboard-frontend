import React from 'react';
import { Volume2 } from 'lucide-react';
import Button from '../ui/Button';

interface VoiceSelectorProps {
  gender: 'male' | 'female';
  onGenderChange: (gender: 'male' | 'female') => void;
}

export const VoiceSelector: React.FC<VoiceSelectorProps> = ({ gender, onGenderChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Elegir voz del asistente
      </label>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2">
          <Button
            onClick={() => onGenderChange('male')}
            variant={gender === 'male' ? 'primary' : 'secondary'}
          >
            Masculino
          </Button>
          <Button
            onClick={() => onGenderChange('female')}
            variant={gender === 'female' ? 'primary' : 'secondary'}
          >
            Femenino
          </Button>
        </div>
        <Button 
          variant="secondary" 
          className="flex items-center justify-center gap-2 text-primary sm:w-auto w-full"
        >
          <Volume2 className="w-4 h-4" />
          <span className="sm:inline hidden">Reproducir muestra</span>
          <span className="sm:hidden inline">Reproducir</span>
        </Button>
      </div>
    </div>
  );
};