import type { StackScreenProps } from '@react-navigation/stack';
import type { Lead } from './index';

export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  Confirmation: { tier: string; zipCode: string; price: number };
  GenerateLead: undefined;
  LeadDetails: { lead: Lead };
  Settings: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  StackScreenProps<RootStackParamList, T>;