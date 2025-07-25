import { Linking } from 'react-native';

export type ContactMethod = 'call' | 'text' | 'email';

export const openContactApp = (method: ContactMethod, contact: string): void => {
  const sanitizedPhone = contact.replace(/[^\d]/g, '');
  
  const methodUrls = {
    call: `tel:${sanitizedPhone}`,
    text: `sms:${sanitizedPhone}`,
    email: `mailto:${contact}`,
  };

  Linking.openURL(methodUrls[method]);
};

export const getContactMethodLabel = (method: ContactMethod): string => {
  const labels = {
    call: 'call',
    text: 'send a text to',
    email: 'email',
  };
  
  return labels[method];
};