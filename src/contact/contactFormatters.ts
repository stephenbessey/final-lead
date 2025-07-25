export const sanitizePhoneNumber = (phone: string): string =>
  phone.replace(/[^\d]/g, '');

export const formatPhoneForDisplay = (phone: string): string => {
  const cleaned = sanitizePhoneNumber(phone);
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

export const isValidPhoneFormat = (phone: string): boolean => {
  const cleaned = sanitizePhoneNumber(phone);
  return cleaned.length === 10 || (cleaned.length === 11 && cleaned[0] === '1');
};