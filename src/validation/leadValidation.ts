import { Lead } from '../types';
import { ValidationResult } from './zipCodeValidation';
import { validateEmail } from './emailValidation';
import { validatePhoneNumber } from './phoneValidation';

export const validateLead = (lead: Partial<Lead>): ValidationResult => {
  const errors: string[] = [];

  if (!lead.name?.trim()) {
    errors.push('Name is required');
  }

  if (!lead.phone) {
    errors.push('Phone number is required');
  } else {
    const phoneValidation = validatePhoneNumber(lead.phone);
    if (!phoneValidation.isValid) {
      errors.push(...phoneValidation.errors);
    }
  }

  if (!lead.email) {
    errors.push('Email is required');
  } else {
    const emailValidation = validateEmail(lead.email);
    if (!emailValidation.isValid) {
      errors.push(...emailValidation.errors);
    }
  }

  if (!lead.address?.trim()) {
    errors.push('Address is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};