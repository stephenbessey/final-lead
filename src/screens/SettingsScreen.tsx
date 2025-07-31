import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useUser } from '../context/UserContext';
import { AppHeader } from '../components/AppHeader';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { validateZipCode } from '../validation/zipCodeValidation';
import { RootStackParamList } from '../../App';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/theme';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

interface Props {
  navigation: SettingsScreenNavigationProp;
}

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { userData, saveZipCode, isLoading, error } = useUser();
  
  const [zipCode, setZipCode] = useState(userData.zipCode || '');
  const [zipCodeError, setZipCodeError] = useState<string | null>(null);
  const [isUpdatingZip, setIsUpdatingZip] = useState(false);

  useEffect(() => {
    if (userData.zipCode && userData.zipCode !== zipCode) {
      setZipCode(userData.zipCode);
    }
  }, [userData.zipCode]);

  const handleSaveZipCode = useCallback(async (): Promise<void> => {
    try {
      setZipCodeError(null);
      
      const validation = validateZipCode(zipCode.trim());
      if (!validation.isValid) {
        setZipCodeError(validation.errors[0]);
        return;
      }

      setIsUpdatingZip(true);
      await saveZipCode(zipCode.trim());
      
      Alert.alert(
        'Success',
        'ZIP code has been saved successfully.',
        [{ text: 'OK' }]
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save ZIP code';
      Alert.alert('Error', errorMessage);
    } finally {
      setIsUpdatingZip(false);
    }
  }, [zipCode, saveZipCode]);

  const handleBackPress = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const handleProfilePress = useCallback((): void => {
    Alert.alert('Profile', 'Profile functionality coming soon!');
  }, []);

  const hasZipCodeChanges = zipCode.trim() !== (userData.zipCode || '');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <AppHeader 
        onProfilePress={handleProfilePress}
        showCredits={true}
        credits={userData.credits}
        title="Settings"
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Plan:</Text>
              <Text style={styles.infoValue}>{userData.tier || 'No Plan'}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Credits:</Text>
              <Text style={styles.infoValue}>{userData.credits}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Monthly Price:</Text>
              <Text style={styles.infoValue}>
                {userData.monthlyPrice ? `$${userData.monthlyPrice.toFixed(2)}` : 'N/A'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Settings</Text>
          
          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>ZIP Code</Text>
            <TextInput
              style={[
                styles.input,
                zipCodeError && styles.inputError,
              ]}
              value={zipCode}
              onChangeText={(text) => {
                setZipCode(text);
                setZipCodeError(null);
              }}
              placeholder="Enter your ZIP code"
              keyboardType="numeric"
              maxLength={10}
              autoCapitalize="none"
            />
            
            {zipCodeError && (
              <Text style={styles.errorText}>{zipCodeError}</Text>
            )}
            
            {hasZipCodeChanges && (
              <Pressable
                style={[
                  styles.saveButton,
                  isUpdatingZip && styles.saveButtonDisabled,
                ]}
                onPress={handleSaveZipCode}
                disabled={isUpdatingZip}
              >
                <Text style={styles.saveButtonText}>
                  {isUpdatingZip ? 'Saving...' : 'Save ZIP Code'}
                </Text>
              </Pressable>
            )}
            
            {!hasZipCodeChanges && userData.zipCode && (
              <Text style={styles.savedText}>✓ ZIP code saved</Text>
            )}
          </View>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </ScrollView>

      <LoadingOverlay visible={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    ...SHADOWS.small,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  infoValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  inputCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    ...SHADOWS.small,
  },
  inputLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: SPACING.md,
    marginTop: SPACING.md,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: COLORS.textHint,
  },
  saveButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
  },
  savedText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.success,
    marginTop: SPACING.sm,
    textAlign: 'center',
    fontWeight: '500',
  },
  errorContainer: {
    backgroundColor: COLORS.errorLight,
    borderRadius: 8,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  errorText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.error,
    textAlign: 'center',
  },
});

export default SettingsScreen;
