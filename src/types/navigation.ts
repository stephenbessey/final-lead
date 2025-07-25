import { Lead } from './index';

export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  Confirmation: { 
    tier: string; 
    zipCode: string; 
    price: number 
  };
  GenerateLead: undefined;
  LeadDetails: { 
    lead: Lead 
  };
  Settings: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = {
  navigation: import('@react-navigation/stack').StackNavigationProp<RootStackParamList, T>;
  route: import('@react-navigation/core').RouteProp<RootStackParamList, T>;
};