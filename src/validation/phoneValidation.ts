import { ValidationResult } from '../types';

export const validatePhoneNumber = (phone: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!phone) {
    errors.push('Phone number is required');
    return { isValid: false, errors };
  }
  
  const digitsOnly = extractDigits(phone);
  
  if (!isValidUSPhoneLength(digitsOnly)) {
    errors.push('Please enter a valid US phone number');
  }
  
  if (hasInvalidCountryCode(digitsOnly)) {
    errors.push('Please enter a valid US phone number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

const extractDigits = (phone: string): string => 
  phone.replace(/\D/g, '');

const isValidUSPhoneLength = (digits: string): boolean => 
  digits.length === 10 || digits.length === 11;

const hasInvalidCountryCode = (digits: string): boolean => 
  digits.length === 11 && digits[0] !== '1';

export const formatPhoneNumber = (phone: string): string => {
  const digits = extractDigits(phone);
  
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  
  if (digits.length === 11 && digits[0] === '1') {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  
  return phone;
};