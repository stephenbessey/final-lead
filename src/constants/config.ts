export const APP_CONFIG = {
  animationDuration: {
    short: 200,
    medium: 300,
    long: 500,
    slotMachine: 3000,
  },
  contactMethods: {
    phone: 'tel:',
    sms: 'sms:',
    email: 'mailto:',
  },
  storage: {
    userDataKey: '@leadgen_user_data',
    authKey: '@leadgen_auth',
  },
} as const;

export const PRICING_TIERS = [
  { name: 'Basic', credits: 10, price: 29.99 },
  { name: 'Professional', credits: 25, price: 69.99 },
  { name: 'Premium', credits: 50, price: 119.99 },
] as const;