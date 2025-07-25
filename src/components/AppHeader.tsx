import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

interface AppHeaderProps {
  onMenuPress: () => void;
  onProfilePress: () => void;
  showCredits?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  onMenuPress, 
  onProfilePress, 
  showCredits = true 
}) => {
  const { userData } = useUser();
  const { currentUser } = useAuth();

  return (
    <View style={styles.header}>
      <Pressable 
        style={styles.iconButton} 
        onPress={onMenuPress}
        android_ripple={{ color: '#E3F2FD' }}
      >
        <Ionicons name="menu" size={24} color="#2196F3" />
      </Pressable>

      {showCredits && (
        <View style={styles.creditsContainer}>
          <Text style={styles.creditsText}>{userData.credits}</Text>
        </View>
      )}

      <Pressable 
        style={styles.profileButton} 
        onPress={onProfilePress}
        android_ripple={{ color: '#E3F2FD', borderless: true }}
      >
        <Text style={styles.profileInitial}>
          {currentUser ? currentUser.charAt(0).toUpperCase() : 'U'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  creditsContainer: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 60,
    alignItems: 'center',
  },
  creditsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});