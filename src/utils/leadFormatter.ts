import { Lead, LifeEvent } from '../types';

declare global {
  interface Number {
    toLocaleString(locales?: string | string[], options?: Intl.NumberFormatOptions): string;
  }
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone;
};

export const formatAddress = (address: string): string => {
  return address.trim();
};

export const formatLifeEvent = (lifeEvent: LifeEvent): string => {
  const eventMap: Record<LifeEvent, string> = {
    'baby': 'New Baby',
    'death': 'Death in Family',
    'married': 'Recently Married',
    'house-sold': 'House Sold',
    'divorced': 'Recently Divorced',
  };
  
  return eventMap[lifeEvent] || lifeEvent;
};

export const formatClientType = (clientType: 'buyer' | 'seller'): string => {
  return clientType === 'buyer' ? 'Potential Buyer' : 'Potential Seller';
};

export const formatPriceRange = (priceRange: '$' | '$$' | '$$$'): string => {
  const rangeMap = {
    '$': 'Budget ($100k-$300k)',
    '$$': 'Mid-range ($300k-$700k)',
    '$$$': 'Premium ($700k+)',
  };
  
  return rangeMap[priceRange] || priceRange;
};

export const formatLeadSummary = (lead: Lead): string => {
  const lifeEvent = formatLifeEvent(lead.lifeEvent);
  const clientType = formatClientType(lead.clientType);
  const priceRange = formatPriceRange(lead.priceRange);
  
  return `${lifeEvent} - ${clientType} - ${priceRange}`;
};

export const formatDateAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  } else {
    return date.toLocaleDateString();
  }
};