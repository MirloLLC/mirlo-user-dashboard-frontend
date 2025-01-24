import type { AgentSettings } from '../types/agent';

const DEFAULT_SETTINGS: AgentSettings = {
  name: 'Mi Agente',
  gender: 'male',
  isActive: false,
  notifications: {
    sms: false,
    email: false,
    slack: false,
  },
  emailAddress: '',
  slackWebhook: '',
  rules: [
    {
      id: '1',
      keyword: 'urgente',
      action: 'Transferir'
    }
  ]
};

class AgentSettingsService {
  private STORAGE_KEY = 'agent_settings';

  async saveSettings(settings: AgentSettings): Promise<AgentSettings> {
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
    return settings;
  }

  async getSettings(): Promise<AgentSettings> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const settings = localStorage.getItem(this.STORAGE_KEY);
    return settings ? JSON.parse(settings) : DEFAULT_SETTINGS;
  }
}

export const agentSettingsService = new AgentSettingsService();