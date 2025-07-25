import { Linking, Alert } from 'react-native';
import { ContactMethod } from '../types';

const cleanContactString = (contact: string): string => {
  return contact.replace(/[^\d@.a-zA-Z]/g, '');
};

const createContactUrl = (method: ContactMethod, contact: string): string => {
  const cleanContact = cleanContactString(contact);
  
  switch (method) {
    case 'phone':
      return `tel:${cleanContact}`;
    case 'sms':
      return `sms:${cleanContact}`;
    case 'email':
      return `mailto:${cleanContact}`;
    default:
      throw new Error(`Unsupported contact method: ${method}`);
  }
};

export const openContactApp = async (method: ContactMethod, contact: string): Promise<void> => {
  try {
    const url = createContactUrl(method, contact);
    const canOpen = await Linking.canOpenURL(url);
    
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      const label = getContactMethodLabel(method);
      Alert.alert(
        'Unable to Open',
        `Cannot open ${label} app. Please check if it's installed.`
      );
    }
  } catch (error) {
    const label = getContactMethodLabel(method);
    Alert.alert(
      'Error',
      `Failed to open ${label} app.`
    );
  }
};

export const getContactMethodLabel = (method: ContactMethod): string => {
  const labels: Record<ContactMethod, string> = {
    phone: 'Phone',
    sms: 'SMS',
    email: 'Email',
  };
  
  return labels[method] || 'Unknown';
};