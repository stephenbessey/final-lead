export interface ValidationResult {
  isValid: boolean;
  errors: readonly string[];
}

export const validatePhoneNumber = (phone: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!phone) {
    errors.push('Phone number is required');
    return { isValid: false, errors };
  }
  
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (digitsOnly.length !== 10 && digitsOnly.length !== 11) {
    errors.push('Please enter a valid US phone number');
  }
  
  if (digitsOnly.length === 11 && digitsOnly[0] !== '1') {
    errors.push('Please enter a valid US phone number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};