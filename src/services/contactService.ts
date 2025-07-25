import { Linking, Alert } from 'react-native';

class ContactService {
  private static instance: ContactService;

  private constructor() {}

  public static getInstance(): ContactService {
    if (!ContactService.instance) {
      ContactService.instance = new ContactService();
    }
    return ContactService.instance;
  }

  public async makePhoneCall(phoneNumber: string): Promise<void> {
    try {
      const cleanPhone = this.cleanPhoneNumber(phoneNumber);
      const url = `tel:${cleanPhone}`;
      const canOpen = await Linking.canOpenURL(url);
      
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        throw new Error('Phone app not available');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to make phone call');
    }
  }

  public async sendSMS(phoneNumber: string, message?: string): Promise<void> {
    try {
      const cleanPhone = this.cleanPhoneNumber(phoneNumber);
      let url = `sms:${cleanPhone}`;
      
      if (message) {
        url += `?body=${encodeURIComponent(message)}`;
      }
      
      const canOpen = await Linking.canOpenURL(url);
      
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        throw new Error('SMS app not available');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to send SMS');
    }
  }

  public async sendEmail(email: string, subject?: string, body?: string): Promise<void> {
    try {
      let url = `mailto:${email}`;
      const params = [];
      
      if (subject) {
        params.push(`subject=${encodeURIComponent(subject)}`);
      }
      
      if (body) {
        params.push(`body=${encodeURIComponent(body)}`);
      }
      
      if (params.length > 0) {
        url += `?${params.join('&')}`;
      }
      
      const canOpen = await Linking.canOpenURL(url);
      
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        throw new Error('Email app not available');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to send email');
    }
  }

  private cleanPhoneNumber(phone: string): string {
    return phone.replace(/[^\d]/g, '');
  }
}

export const contactService = ContactService.getInstance();
