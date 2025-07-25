import { ValidationResult, Lead, RegistrationForm } from '../types';

// Email validation using RFC 5322 compliant regex (simplified)
export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('Email is required');
    return { isValid: false, errors };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (email.length > 254) {
    errors.push('Email address is too long');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// US ZIP code validation (supports both 5-digit and ZIP+4 formats)
export const validateZipCode = (zipCode: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!zipCode) {
    errors.push('ZIP code is required');
    return { isValid: false, errors };
  }
  
  // Remove any spaces or hyphens for validation
  const cleanZipCode = zipCode.replace(/[\s-]/g, '');
  
  // Check for 5-digit or 9-digit format
  const zipRegex = /^(\d{5})(\d{4})?$/;
  
  if (!zipRegex.test(cleanZipCode)) {
    errors.push('Please enter a valid US ZIP code (e.g., 12345 or 12345-6789)');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Phone number validation (US format)
export const validatePhoneNumber = (phone: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!phone) {
    errors.push('Phone number is required');
    return { isValid: false, errors };
  }
  
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // US phone numbers should have exactly 10 digits (excluding country code)
  if (digitsOnly.length !== 10 && digitsOnly.length !== 11) {
    errors.push('Please enter a valid US phone number');
  }
  
  // If 11 digits, first digit should be 1 (US country code)
  if (digitsOnly.length === 11 && digitsOnly[0] !== '1') {
    errors.push('Please enter a valid US phone number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Username validation
export const validateUsername = (username: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!username) {
    errors.push('Username is required');
    return { isValid: false, errors };
  }
  
  if (username.length < 3) {
    errors.push('Username must be at least 3 characters long');
  }
  
  if (username.length > 50) {
    errors.push('Username cannot exceed 50 characters');
  }
  
  // Allow letters, numbers, underscores, and hyphens
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  if (!usernameRegex.test(username)) {
    errors.push('Username can only contain letters, numbers, underscores, and hyphens');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Lead validation
export const validateLead = (lead: Partial<Lead>): ValidationResult => {
  const errors: string[] = [];
  
  // Required fields validation
  const requiredFields: (keyof Lead)[] = [
    'name', 'phone', 'email', 'address', 'propertyValue', 
    'lifeEvent', 'clientType', 'priceRange'
  ];
  
  requiredFields.forEach(field => {
    if (!lead[field]) {
      errors.push(`${field} is required`);
    }
  });
  
  // Specific field validations
  if (lead.email) {
    const emailValidation = validateEmail(lead.email);
    if (!emailValidation.isValid) {
      errors.push(...emailValidation.errors);
    }
  }
  
  if (lead.phone) {
    const phoneValidation = validatePhoneNumber(lead.phone);
    if (!phoneValidation.isValid) {
      errors.push(...phoneValidation.errors);
    }
  }
  
  if (lead.name && lead.name.length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Registration form validation
export const validateRegistrationForm = (form: RegistrationForm): ValidationResult => {
  const errors: string[] = [];
  
  // Validate tier selection
  const validTiers = ['Basic', 'Professional', 'Premium'];
  if (!validTiers.includes(form.selectedTier)) {
    errors.push('Please select a valid pricing tier');
  }
  
  // Validate ZIP code
  const zipValidation = validateZipCode(form.zipCode);
  if (!zipValidation.isValid) {
    errors.push(...zipValidation.errors);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Property value validation (for real estate context)
export const validatePropertyValue = (value: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!value) {
    errors.push('Property value is required');
    return { isValid: false, errors };
  }
  
  // Remove currency symbols and commas
  const numericValue = value.replace(/[$,]/g, '');
  const parsedValue = parseFloat(numericValue);
  
  if (isNaN(parsedValue)) {
    errors.push('Property value must be a valid number');
  } else {
    // Reasonable range for property values
    if (parsedValue < 10000) {
      errors.push('Property value seems too low (minimum $10,000)');
    }
    if (parsedValue > 50000000) {
      errors.push('Property value seems too high (maximum $50,000,000)');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Utility function to sanitize input
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

// Format validation errors for display
export const formatValidationErrors = (errors: readonly string[]): string => {
  if (errors.length === 0) return '';
  if (errors.length === 1) return errors[0];
  
  return `• ${errors.join('\n• ')}`;
};

// Async validation for unique username (example)
export const validateUniqueUsername = async (username: string): Promise<ValidationResult> => {
  const basicValidation = validateUsername(username);
  if (!basicValidation.isValid) {
    return basicValidation;
  }
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const reservedUsernames = ['admin', 'root', 'test', 'demo'];
    if (reservedUsernames.includes(username.toLowerCase())) {
      return {
        isValid: false,
        errors: ['This username is not available'],
      };
    }
    
    return { isValid: true, errors: [] };
  } catch (error) {
    return {
      isValid: false,
      errors: ['Unable to verify username availability. Please try again.'],
    };
  }
};