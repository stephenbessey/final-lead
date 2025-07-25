import { Lead } from '../types';

const NAMES = [
  'John Smith', 'Jane Johnson', 'Mike Williams', 'Sarah Brown', 'David Davis',
  'Emily Wilson', 'Chris Miller', 'Amanda Moore', 'Ryan Taylor', 'Jessica Anderson',
  'Kevin Thomas', 'Lisa Jackson', 'Mark White', 'Jennifer Harris', 'Brian Martin'
];

const STREETS = [
  'Main St', 'Oak Ave', 'Maple Dr', 'Pine Rd', 'Cedar Ln',
  'Elm St', 'Park Ave', 'First St', 'Second Ave', 'Third Dr'
];

const CITIES = [
  'Springfield', 'Franklin', 'Georgetown', 'Madison', 'Riverside',
  'Fairview', 'Greenville', 'Mount Pleasant', 'Oakville', 'Hillcrest'
];

const LIFE_EVENTS: Lead['lifeEvent'][] = ['baby', 'death', 'married', 'house-sold', 'divorced'];
const CLIENT_TYPES: Lead['clientType'][] = ['buyer', 'seller'];
const PRICE_RANGES: Lead['priceRange'][] = ['$', '$$', '$$$'];

export const generateRandomLead = (): Lead => {
  const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
  const randomStreet = STREETS[Math.floor(Math.random() * STREETS.length)];
  const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
  const houseNumber = Math.floor(100 + Math.random() * 9900);
  const phoneArea = Math.floor(200 + Math.random() * 700);
  const phoneExchange = Math.floor(100 + Math.random() * 900);
  const phoneNumber = Math.floor(1000 + Math.random() * 9000);
  
  const baseValue = Math.floor(150000 + Math.random() * 750000);
  const propertyValue = `$${baseValue.toLocaleString()}`;
  
  const emailDomain = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'][Math.floor(Math.random() * 4)];
  const emailPrefix = randomName.toLowerCase().replace(' ', '.');
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: randomName,
    phone: `(${phoneArea}) ${phoneExchange}-${phoneNumber}`,
    email: `${emailPrefix}@${emailDomain}`,
    address: `${houseNumber} ${randomStreet}, ${randomCity}, State`,
    propertyValue,
    lifeEvent: LIFE_EVENTS[Math.floor(Math.random() * LIFE_EVENTS.length)],
    clientType: CLIENT_TYPES[Math.floor(Math.random() * CLIENT_TYPES.length)],
    priceRange: PRICE_RANGES[Math.floor(Math.random() * PRICE_RANGES.length)],
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

  return `
Lead Details:
Name: ${lead.name}
Phone: ${lead.phone}
Email: ${lead.email}
Address: ${lead.address}
Property Value: ${lead.propertyValue}
Client Type: ${lead.clientType.charAt(0).toUpperCase() + lead.clientType.slice(1)}
Life Event: ${lifeEventLabels[lead.lifeEvent]}
Price Range: ${lead.priceRange}
Generated: ${new Date().toLocaleString()}
  `.trim();
};

