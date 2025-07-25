export type ContactMethod = 'phone' | 'sms' | 'email';

export interface ContactInfo {
  phone: string;
  email: string;
  address?: string;
}

export interface ContactActionProps {
  onContactAction: (method: ContactMethod) => void;
}