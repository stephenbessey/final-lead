import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { AppHeader } from '../components/AppHeader';
import { RootStackScreenProps } from '../types/navigation';

type Props = RootStackScreenProps<'Settings'>;

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { logout, currentUser } = useAuth();
  const { userData } = useUser();

  const handleLogout = (): void => {
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
            navigation.navigate('Login');
          }
        },
      ]
    );
  };

  const handleUpgradePlan = (): void => {
    Alert.alert('Upgrade Plan', 'Upgrade functionality coming soon!');
  };

  const handleSupport = (): void => {
    Alert.alert('Support', 'Contact support at support@leadgen.com');
  };

  const handleMenuPress = (): void => {
    navigation.goBack();
  };

  const handleProfilePress = (): void => {
    Alert.alert('Profile', 'Profile functionality coming soon!');
  };

  return (
    <View style={styles.container}>
      <AppHeader 
        onMenuPress={handleMenuPress}
        onProfilePress={handleProfilePress}
        showCredits={false}
      />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Settings</Text>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Username</Text>
            <Text style={styles.infoValue}>{currentUser || 'Guest'}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Current Plan</Text>
            <Text style={styles.infoValue}>{userData.tier || 'No Plan'}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Credits Remaining</Text>
            <Text style={styles.infoValue}>{userData.credits}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Monthly Price</Text>
            <Text style={styles.infoValue}>${userData.monthlyPrice.toFixed(2)}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoLabel: {
    fontSize: 16,
    color: '#757575',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#424242',
  },
  actionButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionText: {
    fontSize: 16,
    color: '#424242',
    flex: 1,
    marginLeft: 16,
  },
});

export default SettingsScreen;