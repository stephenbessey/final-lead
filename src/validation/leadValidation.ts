import { Lead, ValidationResult } from '../types';

export const validateLead = (lead: Partial<Lead>): ValidationResult => {
  const errors: string[] = [];

  if (!lead.name || lead.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!lead.phone || lead.phone.trim().length === 0) {
    errors.push('Phone number is required');
  } else {
    const phoneDigits = lead.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      errors.push('Phone number must be at least 10 digits');
    }
  }

  if (!lead.email || lead.email.trim().length === 0) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(lead.email)) {
      errors.push('Email format is invalid');
    }
  }

  if (!lead.address || lead.address.trim().length === 0) {
    errors.push('Address is required');
  }

  if (!lead.propertyValue || lead.propertyValue.trim().length === 0) {
    errors.push('Property value is required');
  } else {
    const propertyValueStr = lead.propertyValue.toString();
    const currencyRegex = /^\$[\d,]+(\.\d{2})?$/;
    if (!currencyRegex.test(propertyValueStr)) {
      const numericValue = parseFloat(propertyValueStr.replace(/[$,]/g, ''));
      if (isNaN(numericValue) || numericValue <= 0) {
        errors.push('Property value must be a valid positive amount');
      }
    }
  }

  const validLifeEvents = ['baby', 'death', 'married', 'house-sold', 'divorced'];
  if (!lead.lifeEvent || !validLifeEvents.includes(lead.lifeEvent)) {
    errors.push('Valid life event is required');
  }

  const validClientTypes = ['buyer', 'seller'];
  if (!lead.clientType || !validClientTypes.includes(lead.clientType)) {
    errors.push('Valid client type is required');
  }
  
  const validPriceRanges = ['$', '$$', '$$$'];
  if (!lead.priceRange || !validPriceRanges.includes(lead.priceRange)) {
    errors.push('Valid price range is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateLeadForGeneration = (options: {
  zipCode?: string;
  maxResults?: number;
}): ValidationResult => {
  const errors: string[] = [];

  if (!options.zipCode || options.zipCode.trim().length === 0) {
    errors.push('ZIP code is required for lead generation');
  }

  if (options.maxResults !== undefined) {
    if (options.maxResults <= 0) {
      errors.push('Max results must be greater than 0');
    }
    if (options.maxResults > 50) {
      errors.push('Max results cannot exceed 50');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};