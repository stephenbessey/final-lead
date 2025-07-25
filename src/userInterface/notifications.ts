import { Alert, ToastAndroid, Platform } from 'react-native';

const showToast = (message: string): void => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('Notification', message);
  }
};

export const notifySuccess = (message: string): void => {
  showToast(message);
};

export const notifyError = (message: string): void => {
  showToast(`Error: ${message}`);
};

export const notifyInfo = (message: string): void => {
  showToast(message);
};