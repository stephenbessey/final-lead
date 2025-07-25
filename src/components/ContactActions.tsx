import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ContactMethod } from '../contact/contactActions';

interface ContactActionsProps {
  onContactAction: (action: ContactMethod) => void;
}

export const ContactActions: React.FC<ContactActionsProps> = ({ onContactAction }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Contact Actions</Text>
    <View style={styles.actionGrid}>
      <ContactButton 
        icon="call" 
        label="Call" 
        color="#4CAF50" 
        onPress={() => onContactAction('call')} 
      />
      <ContactButton 
        icon="chatbubble" 
        label="Text" 
        color="#2196F3" 
        onPress={() => onContactAction('text')} 
      />
      <ContactButton 
        icon="mail" 
        label="Email" 
        color="#FF9800" 
        onPress={() => onContactAction('email')} 
      />
    </View>
  </View>
);

interface ContactButtonProps {
  icon: string;
  label: string;
  color: string;
  onPress: () => void;
}

const ContactButton: React.FC<ContactButtonProps> = ({ icon, label, color, onPress }) => (
  <Pressable style={[styles.contactButton, { borderColor: color }]} onPress={onPress}>
    <Ionicons name={icon as any} size={32} color={color} />
    <Text style={[styles.contactButtonText, { color }]}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contactButton: {
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
    minWidth: 80,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
});
