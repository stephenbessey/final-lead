import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { ResponsiveLayout } from '../components/ResponsiveLayout';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { useSmoothNavigation } from '../hooks/useSmoothNavigation';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/theme';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

interface Props {
  navigation: SettingsScreenNavigationProp;
}

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { currentUser, logout } = useAuth();
  const { credits, plan, zipCode } = useUser();
  const { navigateImmediately } = useSmoothNavigation(navigation);

  const handleUpgradePlan = useCallback(() => {
    Alert.alert('Upgrade Plan', 'This feature is coming soon!');
  }, []);

  const handleSupport = useCallback(() => {
    Alert.alert('Support', 'Contact support at support@leadgen.com');
  }, []);

  const handleLogout = useCallback(() => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            logout();
            navigateImmediately('Login');
          }
        },
      ]
    );
  }, [logout, navigateImmediately]);

  const handleBackToApp = useCallback(() => {
    navigateImmediately('GenerateLead');
  }, [navigateImmediately]);

  return (
    <ResponsiveLayout scrollable edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackToApp}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </Pressable>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* User Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{currentUser?.name || 'Not available'}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{currentUser?.email || 'Not available'}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Plan</Text>
            <Text style={styles.infoValue}>{plan}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Credits Remaining</Text>
            <Text style={styles.infoValue}>{credits}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Target ZIP Code</Text>
            <Text style={styles.infoValue}>{zipCode || 'Not set'}</Text>
          </View>
        </View>

        {/* Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          
          <Pressable style={styles.actionButton} onPress={handleUpgradePlan}>
            <Ionicons name="trending-up" size={24} color="#4CAF50" />
            <Text style={styles.actionText}>Upgrade Plan</Text>
            <Ionicons name="chevron-forward" size={20} color="#757575" />
          </Pressable>

          <Pressable style={styles.actionButton} onPress={handleSupport}>
            <Ionicons name="help-circle" size={24} color="#2196F3" />
            <Text style={styles.actionText}>Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#757575" />
          </Pressable>

          <Pressable style={styles.actionButton} onPress={handleLogout}>
            <Ionicons name="log-out" size={24} color="#F44336" />
            <Text style={[styles.actionText, { color: '#F44336' }]}>Logout</Text>
            <Ionicons name="chevron-forward" size={20} color="#757575" />
          </Pressable>
        </View>
      </ScrollView>
    </ResponsiveLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.small,
  },
  backButton: {
    padding: SPACING.sm,
    borderRadius: 20,
  },
  title: {
    ...TYPOGRAPHY.headline,
    color: COLORS.primary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.headline,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  infoLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  infoValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  actionButton: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  actionText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    flex: 1,
    marginLeft: SPACING.md,
  },
});

export default SettingsScreen;