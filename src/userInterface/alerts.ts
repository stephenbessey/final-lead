import { Alert } from 'react-native';

export const confirmContactAction = (
  actionLabel: string,
  onConfirm: () => void
): void => {
  Alert.alert(
    'Contact Lead',
    `Are you sure you want to ${actionLabel.toLowerCase()} this lead?`,
    [
      { text: 'Cancel', style: 'cancel' },
      { text: actionLabel, onPress: onConfirm },
    ]
  );
};

export const warnAboutDataLoss = (onConfirm: () => void): void => {
  Alert.alert(
    'Leave Screen',
    'Are you sure you want to go back? Any unsaved changes will be lost.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Leave', style: 'destructive', onPress: onConfirm },
    ]
  );
};

export const showErrorAlert = (title: string, message: string): void => {
  Alert.alert(title, message, [{ text: 'OK' }]);
};

export const showSuccessAlert = (title: string, message: string): void => {
  Alert.alert(title, message, [{ text: 'OK' }]);
};