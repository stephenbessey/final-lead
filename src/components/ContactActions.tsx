import React from 'react';
import { Alert } from 'react-native';
import { ActionButtons } from './ActionButtons';
import { openContactApp } from '../contact/contactActions';
import { COLORS } from '../constants/theme';

type ContactMethod = 'phone' | 'sms' | 'email';

interface ContactActionsProps {
  phone: string;
  email: string;
  layout?: 'horizontal' | 'vertical';
  onContactAction?: (method: ContactMethod) => void;
}

export const ContactActions: React.FC<ContactActionsProps> = ({
  phone,
  email,
  layout = 'horizontal',
  onContactAction,
}) => {
  const handleCall = async () => {
    try {
      await openContactApp('phone', phone);
      onContactAction?.('phone');
    } catch (error) {
      Alert.alert('Error', 'Unable to make phone call');
    }
  };

  const handleSMS = async () => {
    try {
      await openContactApp('sms', phone);
      onContactAction?.('sms');
    } catch (error) {
      Alert.alert('Error', 'Unable to send SMS');
    }
  };

  const handleEmail = async () => {
    try {
      await openContactApp('email', email);
      onContactAction?.('email');
    } catch (error) {
      Alert.alert('Error', 'Unable to send email');
    }
  };

  const buttons = [
    {
      id: 'call',
      title: 'Call',
      icon: 'call' as const,
      onPress: handleCall,
      color: COLORS.success,
    },
    {
      id: 'sms',
      title: 'SMS',
      icon: 'chatbubble' as const,
      onPress: handleSMS,
      color: COLORS.primary,
    },
    {
      id: 'email',
      title: 'Email',
      icon: 'mail' as const,
      onPress: handleEmail,
      color: COLORS.secondary,
    },
  ];

  return <ActionButtons buttons={buttons} layout={layout} />;
};