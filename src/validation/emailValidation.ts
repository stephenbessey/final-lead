export interface ValidationResult {
  isValid: boolean;
  errors: readonly string[];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;

export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('Email is required');
    return { isValid: false, errors };
  }
  
  if (!EMAIL_REGEX.test(email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (email.length > MAX_EMAIL_LENGTH) {
    errors.push('Email address is too long');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};