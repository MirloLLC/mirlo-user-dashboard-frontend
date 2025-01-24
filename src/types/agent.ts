export interface AgentSettings {
  name: string;
  gender: 'male' | 'female';
  isActive: boolean;
  notifications: {
    sms: boolean;
    email: boolean;
    slack: boolean;
  };
  emailAddress: string;
  slackWebhook: string;
  rules: Array<{
    id: string;
    keyword: string;
    action: 'Transferir' | 'No Transferir';
  }>;
}