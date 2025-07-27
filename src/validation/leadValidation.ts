import { Lead, ValidationResult } from '../types';

const safeTrim = (value: any): string => {
  if (typeof value === 'string') {
    return value.trim();
  }
  if (typeof value === 'number') {
    return value.toString();
  }
  return String(value || '').trim();
};

export const validateLead = (lead: Partial<Lead>): ValidationResult => {
  const errors: string[] = [];

  if (!safeTrim(lead.name)) {
    errors.push('Name is required');
  }

  if (!safeTrim(lead.email)) {
    errors.push('Email is required');
  } else if (!isValidEmail(safeTrim(lead.email))) {
    errors.push('Please enter a valid email address');
  }

  if (!safeTrim(lead.phone)) {
    errors.push('Phone number is required');
  } else if (!isValidPhoneNumber(safeTrim(lead.phone))) {
    errors.push('Please enter a valid phone number');
  }

  if (!safeTrim(lead.address)) {
    errors.push('Address is required');
  }

  if (!lead.propertyValue || lead.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  }

  if (!lead.lifeEvent) {
    errors.push('Life event is required');
  }

  if (!lead.priceRange) {
    errors.push('Price range is required');
  }

  if (!lead.clientType) {
    errors.push('Client type is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9]?[\s\-\(\)]?[\d\s\-\(\)]{10,14}$/;
  return phoneRegex.test(phone);
};

export const validatePropertyValue = (value: string | number): ValidationResult => {
  const errors: string[] = [];
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numericValue)) {
    errors.push('Property value must be a valid number');
  } else if (numericValue <= 0) {
    errors.push('Property value must be greater than 0');
  } else if (numericValue > 10000000) {
    errors.push('Property value seems unreasonably high');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const sanitizeLeadData = (lead: Partial<Lead>): Partial<Lead> => {
  return {
    ...lead,
    name: safeTrim(lead.name),
    email: safeTrim(lead.email),
    phone: safeTrim(lead.phone),
    address: safeTrim(lead.address),
  };
};