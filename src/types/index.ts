// Core business types
export interface Lead {
  readonly id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  propertyValue: string;
  lifeEvent: LifeEvent;
  clientType: ClientType;
  priceRange: PriceRange;
  readonly createdAt?: Date;
}

export type LifeEvent = 'baby' | 'death' | 'married' | 'house-sold' | 'divorced';
export type ClientType = 'buyer' | 'seller';
export type PriceRange = '$' | '$$' | '$$$';

export interface PricingTier {
  readonly name: TierName;
  readonly credits: number;
  readonly price: number;
  readonly features?: readonly string[];
}

export type TierName = 'Basic' | 'Professional' | 'Premium';

export interface UserData {
  credits: number;
  tier: string;
  zipCode: string;
  monthlyPrice: number;
  readonly userId?: string;
  readonly subscriptionStartDate?: Date;
}

// API and Service types
export interface LeadGenerationOptions {
  zipCode: string;
  clientType?: ClientType;
  priceRange?: PriceRange;
  maxResults?: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: readonly string[];
}

// UI and Component types
export interface LoadingState {
  isLoading: boolean;
  loadingMessage?: string;
}

export interface ErrorState {
  hasError: boolean;
  error?: Error;
  errorMessage?: string;
}

// Form types
export interface LoginForm {
  username: string;
  password?: string;
}

export interface RegistrationForm {
  selectedTier: TierName;
  zipCode: string;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Constants as const assertions for better type safety
export const LIFE_EVENT_LABELS = {
  baby: 'New Baby',
  death: 'Death in Family',
  married: 'Recently Married',
  'house-sold': 'House Sold Nearby',
  divorced: 'Recently Divorced',
} as const;

export const CLIENT_TYPE_LABELS = {
  buyer: 'Buyer',
  seller: 'Seller',
} as const;

export const PRICE_RANGE_LABELS = {
  '$': 'Budget',
  '$$': 'Mid-Range',
  '$$$': 'Premium',
} as const;