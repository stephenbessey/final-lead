import { Alert } from 'react-native';

export const notifySuccess = (message: string): void => {
  Alert.alert('Success', message);
};

export const notifyError = (message: string): void => {
  Alert.alert('Error', message);
};

export const notifyComingSoon = (featureName: string): void => {
  Alert.alert(featureName, `${featureName} functionality coming soon!`);
};