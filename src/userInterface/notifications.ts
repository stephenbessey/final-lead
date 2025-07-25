import { Alert } from 'react-native';

export const notifySuccess = (message: string): void => {
  Alert.alert('Success', message);
};

export const notifyComingSoon = (featureName: string): void => {
  Alert.alert(featureName, `${featureName} functionality coming soon!`);
};

export const notifyContactSupport = (): void => {
  Alert.alert('Support', 'Contact support at support@leadgen.com');
};

export const notifyError = (message: string): void => {
  Alert.alert('Error', message);
};

export const notifyInsufficientCredits = (): void => {
  Alert.alert(
    'Insufficient Credits', 
    'You don\'t have enough credits. Please purchase more credits.'
  );
};