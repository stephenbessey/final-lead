export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  propertyValue: number;
  lifeEvent: LifeEvent;
  priceRange: '$' | '$$' | '$$$';
  clientType: 'buyer' | 'seller';
  createdAt: string; 
}

export type LifeEvent = 'baby' | 'death' | 'married' | 'house-sold' | 'divorced';

export const LIFE_EVENT_LABELS: Record<LifeEvent, string> = {
  'baby': 'New Baby',
  'death': 'Death in Family',
  'married': 'Recently Married',
  'house-sold': 'House Sold',
  'divorced': 'Recently Divorced',
};

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface LeadGenerationOptions {
  zipCode: string;
  maxResults?: number;
}

export type ContactMethod = 'phone' | 'sms' | 'email';

export interface User {
  id: string;
  email: string;
  name: string;
  credits: number;
  plan: 'Basic' | 'Professional' | 'Premium';
  zipCode: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface UserState {
  credits: number;
  plan: string;
  zipCode: string;
}