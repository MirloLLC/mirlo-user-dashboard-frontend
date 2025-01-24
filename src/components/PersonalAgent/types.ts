export interface PersonalAgentState {
  name: string;
  gender: 'male' | 'female';
}

export interface PersonalAgentActions {
  setName: (name: string) => void;
  setGender: (gender: 'male' | 'female') => void;
}