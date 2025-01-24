import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import { VoiceSelector } from './VoiceSelector';
import { useAgentSettings } from '../../hooks/useAgentSettings';

export const PersonalAgent = () => {
  const { state, updateField } = useAgentSettings();
  const [localState, setLocalState] = useState({
    name: '',
    gender: 'male' as const,
  });

  useEffect(() => {
    if (!state.isLoading) {
      setLocalState({
        name: state.settings.name,
        gender: state.settings.gender,
      });
    }
  }, [state.settings, state.isLoading]);

  const handleChange = (field: 'name' | 'gender', value: string) => {
    setLocalState(prev => ({ ...prev, [field]: value }));
    updateField(field, value, 'personalInfo');
  };

  if (state.isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-lg font-semibold mb-6">Configuración del Agente</h2>
      <div className="max-w-xl space-y-6">
        <Input
          label="Nombre y Apellido"
          id="name"
          type="text"
          placeholder="Ingresa tu nombre y apellido"
          value={localState.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />

        <VoiceSelector
          gender={localState.gender}
          onGenderChange={(gender) => handleChange('gender', gender)}
        />
      </div>
    </div>
  );
};