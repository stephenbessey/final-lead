import { Lead, LifeEvent, ClientType, PriceRange } from '../types';
import { formatPhoneForDisplay } from '../contact/contactFormatters';

const FIRST_NAMES: string[] = [
  'James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda',
  'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Nancy', 'Daniel', 'Lisa',
  'Matthew', 'Betty', 'Anthony', 'Helen', 'Mark', 'Sandra', 'Donald', 'Donna',
];

const LAST_NAMES: string[] = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
];

const STREET_NAMES: string[] = [
  'Main St', 'Oak Ave', 'Maple Dr', 'Park Blvd', 'Cedar Ln', 'Elm St', 'Pine Ave',
  'Washington St', 'Lincoln Ave', 'Jefferson Dr', 'Madison Blvd', 'Monroe St',
  'Adams Ave', 'Jackson Dr', 'Harrison Blvd', 'Tyler St', 'Taylor Ave', 'Wilson Dr',
];

const EMAIL_DOMAINS: string[] = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com',
];

const LIFE_EVENTS: LifeEvent[] = ['baby', 'death', 'married', 'house-sold', 'divorced'];
const CLIENT_TYPES: ClientType[] = ['buyer', 'seller'];
const PRICE_RANGES: PriceRange[] = ['$', '$$', '$$$'];

const getRandomArrayElement = (array: string[]): string => {
  if (array.length === 0) {
    throw new Error('Array cannot be empty');
  }
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

const getRandomLifeEvent = (): LifeEvent => {
  if (LIFE_EVENTS.length === 0) {
    return 'baby'; // fallback
  }
  const index = Math.floor(Math.random() * LIFE_EVENTS.length);
  return LIFE_EVENTS[index];
};

const getRandomClientType = (): ClientType => {
  if (CLIENT_TYPES.length === 0) {
    return 'buyer'; // fallback
  }
  const index = Math.floor(Math.random() * CLIENT_TYPES.length);
  return CLIENT_TYPES[index];
};

const getRandomPriceRange = (): PriceRange => {
  if (PRICE_RANGES.length === 0) {
    return '$'; // fallback
  }
  const index = Math.floor(Math.random() * PRICE_RANGES.length);
  return PRICE_RANGES[index];
};

const generateRandomId = (): string => 
  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const generateRandomPhone = (): string => {
  const areaCode = Math.floor(Math.random() * 800) + 200;
  const exchange = Math.floor(Math.random() * 800) + 200;
  const number = Math.floor(Math.random() * 10000);
  const phoneNumber = `${areaCode}${exchange}${number.toString().padStart(4, '0')}`;
  return formatPhoneForDisplay(phoneNumber);
};

const generateRandomEmail = (firstName: string, lastName: string): string => {
  const domain = getRandomArrayElement(EMAIL_DOMAINS);
  const separator = Math.random() > 0.5 ? '.' : '';
  const number = Math.random() > 0.7 ? Math.floor(Math.random() * 99) : '';
  return `${firstName.toLowerCase()}${separator}${lastName.toLowerCase()}${number}@${domain}`;
};

const generateRandomAddress = (): string => {
  const streetNumber = Math.floor(Math.random() * 9999) + 1;
  const streetName = getRandomArrayElement(STREET_NAMES);
  return `${streetNumber} ${streetName}`;
};

const generateRandomPropertyValue = (): string => {
  const value = Math.floor(Math.random() * 900000) + 100000;
  return `$${value.toLocaleString()}`;
};

export const generateRandomLead = (): Lead => {
  const firstName = getRandomArrayElement(FIRST_NAMES);
  const lastName = getRandomArrayElement(LAST_NAMES);
  
  return {
    id: generateRandomId(),
    name: `${firstName} ${lastName}`,
    phone: generateRandomPhone(),
    email: generateRandomEmail(firstName, lastName),
    address: generateRandomAddress(),
    propertyValue: generateRandomPropertyValue(),
    lifeEvent: getRandomLifeEvent(),
    clientType: getRandomClientType(),
    priceRange: getRandomPriceRange(),
    createdAt: new Date().toISOString(), 
  };
};

export const formatLeadForExport = (lead: Lead): string => {
  const lifeEventLabels = {
    baby: 'New Baby',
    death: 'Death in Family',
    married: 'Recently Married',
    'house-sold': 'House Sold Nearby',
    divorced: 'Recently Divorced',
  };

  const clientTypeLabels = {
    buyer: 'Buyer',
    seller: 'Seller',
  };

  const priceRangeLabels = {
    '$': 'Budget',
    '$$': 'Mid-Range',
    '$$$': 'Premium',
  };

  const createdDate = lead.createdAt 
    ? (typeof lead.createdAt === 'string' 
        ? new Date(lead.createdAt).toLocaleDateString()
        : lead.createdAt.toLocaleDateString())
    : 'Unknown';

  return `
Lead Information:
================
Name: ${lead.name}
Phone: ${lead.phone}
Email: ${lead.email}
Address: ${lead.address}
Property Value: ${lead.propertyValue}
Life Event: ${lifeEventLabels[lead.lifeEvent]}
Client Type: ${clientTypeLabels[lead.clientType]}
Price Range: ${priceRangeLabels[lead.priceRange]}
Generated: ${createdDate}
Lead ID: ${lead.id}
================
  `.trim();
};