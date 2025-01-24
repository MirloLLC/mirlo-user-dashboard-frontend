import { useContext } from 'react';
import { AgentSettingsContext } from '../contexts/AgentSettingsContext';

export function useAgentSettings() {
  const context = useContext(AgentSettingsContext);
  if (!context) {
    throw new Error('useAgentSettings must be used within AgentSettingsProvider');
  }
  return context;
}