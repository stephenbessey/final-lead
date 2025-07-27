  export const formatPhoneForDisplay = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    const areaCode = cleaned.slice(0, 3);
    const exchange = cleaned.slice(3, 6);
    const number = cleaned.slice(6, 10);
    return `(${areaCode}) ${exchange}-${number}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    const areaCode = cleaned.slice(1, 4);
    const exchange = cleaned.slice(4, 7);
    const number = cleaned.slice(7, 11);
    return `(${areaCode}) ${exchange}-${number}`;
  }
  
  return phone;
};

export const formatEmailForDisplay = (email: string): string => {
  return email.toLowerCase().trim();
};

export const stripPhoneFormatting = (phone: string): string => {
  return phone.replace(/\D/g, '');
};