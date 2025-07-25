import { ValidationResult } from '../types';

const ZIP_CODE_REGEX = /^(\d{5})(\d{4})?$/;

export const validateZipCode = (zipCode: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!zipCode) {
    errors.push('ZIP code is required');
    return { isValid: false, errors };
  }
  
  const cleanZipCode = sanitizeZipCode(zipCode);
  
  if (!ZIP_CODE_REGEX.test(cleanZipCode)) {
    errors.push('Please enter a valid US ZIP code (e.g., 12345 or 12345-6789)');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const sanitizeZipCode = (zipCode: string): string => 
  zipCode.replace(/[\s-]/g, '');

export const formatZipCode = (zipCode: string): string => {
  const clean = sanitizeZipCode(zipCode);
  if (clean.length === 9) {
    return `${clean.slice(0, 5)}-${clean.slice(5)}`;
  }
  return clean;
};

export const isValidZipCodeFormat = (zipCode: string): boolean => 
  ZIP_CODE_REGEX.test(sanitizeZipCode(zipCode));