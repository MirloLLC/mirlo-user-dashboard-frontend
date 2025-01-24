import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { agentSettingsService } from '../services/agentSettingsService';
import type { AgentSettings } from '../types/agent';

interface AgentSettingsState {
  settings: AgentSettings;
  isLoading: boolean;
  error: string | null;
  hasChanges: boolean;
  modifiedSections: string[];
}

const initialState: AgentSettingsState = {
  settings: {
    name: '',
    gender: 'male',
    isActive: false,
    notifications: {
      sms: false,
      email: false,
      slack: false,
    },
    emailAddress: '',
    slackWebhook: '',
  },
  isLoading: false,
  error: null,
  hasChanges: false,
  modifiedSections: [],
};

type AgentSettingsAction = 
  | { type: 'SET_SETTINGS'; payload: AgentSettings }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'UPDATE_FIELD'; payload: { field: keyof AgentSettings; value: any; section: string } }
  | { type: 'CLEAR_CHANGES' };

function reducer(state: AgentSettingsState, action: AgentSettingsAction): AgentSettingsState {
  switch (action.type) {
    case 'SET_SETTINGS':
      return { ...state, settings: action.payload, error: null };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'UPDATE_FIELD':
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload.field]: action.payload.value,
        },
        hasChanges: true,
        modifiedSections: state.modifiedSections.includes(action.payload.section)
          ? state.modifiedSections
          : [...state.modifiedSections, action.payload.section],
      };
    case 'CLEAR_CHANGES':
      return {
        ...state,
        hasChanges: false,
        modifiedSections: [],
      };
    default:
      return state;
  }
}

export const AgentSettingsContext = createContext<{
  state: AgentSettingsState;
  saveSettings: (settings: Partial<AgentSettings>) => Promise<void>;
  updateField: (field: keyof AgentSettings, value: any, section: string) => void;
} | null>(null);

export function AgentSettingsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const saveSettings = useCallback(async (settings: Partial<AgentSettings>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const updatedSettings = await agentSettingsService.saveSettings({
        ...state.settings,
        ...settings,
      });
      dispatch({ type: 'SET_SETTINGS', payload: updatedSettings });
      dispatch({ type: 'CLEAR_CHANGES' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error saving settings' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.settings]);

  const updateField = useCallback((field: keyof AgentSettings, value: any, section: string) => {
    dispatch({ type: 'UPDATE_FIELD', payload: { field, value, section } });
  }, []);

  return (
    <AgentSettingsContext.Provider value={{ state, saveSettings, updateField }}>
      {children}
    </AgentSettingsContext.Provider>
  );
}