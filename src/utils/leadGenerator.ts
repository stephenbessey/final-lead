import { Lead } from '../types';

const SAMPLE_NAMES = [
  'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis',
  'David Wilson', 'Jennifer Miller', 'Robert Taylor', 'Lisa Anderson',
  'Christopher Lee', 'Amanda Garcia', 'Matthew Martinez', 'Jessica Rodriguez',
  'Daniel Hernandez', 'Ashley Lopez', 'Anthony Gonzalez', 'Elizabeth Miller'
];

const SAMPLE_ADDRESSES = [
  '123 Main St', '456 Oak Ave', '789 Pine Rd', '321 Elm St',
  '654 Maple Dr', '987 Cedar Ln', '147 Birch Way', '258 Willow Ct',
  '369 Sunset Blvd', '741 Harbor View', '852 Mountain Dr', '963 Valley Rd'
];

const LIFE_EVENTS: readonly ('baby' | 'death' | 'married' | 'house-sold' | 'divorced')[] = [
  'baby', 'death', 'married', 'house-sold', 'divorced'
];

const PRICE_RANGES: readonly ('$' | '$$' | '$$$')[] = ['$', '$$', '$$$'];
const CLIENT_TYPES: readonly ('buyer' | 'seller')[] = ['buyer', 'seller'];

const generateEmail = (name: string): string => {
  const cleanName = name.toLowerCase().replace(/\s+/g, '.');
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${cleanName}@${domain}`;
};

const generatePhone = (): string => {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const exchange = Math.floor(Math.random() * 900) + 100;
  const number = Math.floor(Math.random() * 9000) + 1000;
  return `(${areaCode}) ${exchange}-${number}`;
};

const generatePropertyValue = (priceRange: '$' | '$$' | '$$$'): number => {
  switch (priceRange) {
    case '$':
      return Math.floor(Math.random() * 200000) + 100000; 
    case '$$':
      return Math.floor(Math.random() * 400000) + 300000; 
    case '$$$':
      return Math.floor(Math.random() * 800000) + 700000; 
    default:
      return Math.floor(Math.random() * 400000) + 200000;
  }
};

export const generateRandomLead = (): Lead => {
  const randomName = SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)];
  const randomAddress = SAMPLE_ADDRESSES[Math.floor(Math.random() * SAMPLE_ADDRESSES.length)];
  const lifeEvent = LIFE_EVENTS[Math.floor(Math.random() * LIFE_EVENTS.length)];
  const priceRange = PRICE_RANGES[Math.floor(Math.random() * PRICE_RANGES.length)];
  const clientType = CLIENT_TYPES[Math.floor(Math.random() * CLIENT_TYPES.length)];
  
  return {
    id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: randomName,
    email: generateEmail(randomName),
    phone: generatePhone(),
    address: randomAddress,
    propertyValue: generatePropertyValue(priceRange),
    lifeEvent,
    priceRange,
    clientType,
    createdAt: new Date().toISOString(), 
  };
};


export const parseLeadDate = (lead: Lead): Date => {
  return new Date(lead.createdAt);
};