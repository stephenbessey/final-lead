import { ValidationResult } from '../types';

export const validateZipCode = (zipCode: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!zipCode) {
    errors.push('ZIP code is required');
    return { isValid: false, errors };
  }
  
  const cleanZipCode = zipCode.replace(/[\s-]/g, '');
  const zipRegex = /^(\d{5})(\d{4})?$/;
  
  if (!zipRegex.test(cleanZipCode)) {
    errors.push('Please enter a valid US ZIP code');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};