export const PRICING_TIERS = [
  { name: 'Basic' as const, credits: 10, price: 29.99 },
  { name: 'Professional' as const, credits: 25, price: 69.99 },
  { name: 'Premium' as const, credits: 50, price: 119.99 },
] as const;

export const CREDIT_MAP = {
  Basic: 10,
  Professional: 25,
  Premium: 50,
} as const;

export type TierName = typeof PRICING_TIERS[number]['name'];

export const getTierByName = (name: string) => 
  PRICING_TIERS.find(tier => tier.name === name);

export const getCreditsByTier = (tierName: TierName): number => 
  CREDIT_MAP[tierName];