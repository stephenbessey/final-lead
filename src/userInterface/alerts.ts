import { Alert } from 'react-native';

export const confirmContactAction = (
  actionLabel: string,
  onConfirm: () => void
): void => {
  Alert.alert(
    'Contact Lead',
    `This will ${actionLabel} the lead and open in another app. Are you sure?`,
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', onPress: onConfirm },
    ]
  );
};

export const warnAboutDataLoss = (onConfirm: () => void): void => {
  Alert.alert(
    'Warning',
    'Lead data will be lost if you leave. Continue?',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', style: 'destructive', onPress: onConfirm },
    ]
  );
};

export const confirmLogout = (onConfirm: () => void): void => {
  Alert.alert(
    'Logout',
    'Are you sure you want to logout?',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: onConfirm },
    ]
  );
};
