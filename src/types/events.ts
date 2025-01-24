export interface Event {
  id: string;
  callId: string;
  phoneNumber: string;
  date: string;
  time: string;
  duration: string;
  action: 'Transferido' | 'No Transferido';
  tags: string[];
  matchedRule?: string;
}

export interface SortConfig {
  key: keyof Event;
  direction: 'asc' | 'desc';
}