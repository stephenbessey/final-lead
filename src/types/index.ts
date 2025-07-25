export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  propertyValue: string;
  lifeEvent: 'baby' | 'death' | 'married' | 'house-sold' | 'divorced';
  clientType: 'buyer' | 'seller';
  priceRange: '$' | '$$' | '$$$';
}

export interface PricingTier {
  name: string;
  credits: number;
  price: number;
}

export interface UserData {
  credits: number;
  tier: string;
  zipCode: string;
  monthlyPrice: number;
}