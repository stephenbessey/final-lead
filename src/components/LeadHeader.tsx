import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LeadHeaderProps {
  lead: any;
  lifeEvent: { icon: string; label: string };
}

export const LeadHeader: React.FC<LeadHeaderProps> = ({ lead, lifeEvent }) => (
  <View style={styles.header}>
    <Text style={styles.title}>{lead.name}</Text>
    <View style={styles.eventContainer}>
      <Ionicons name={lifeEvent.icon as any} size={24} color="#2196F3" />
      <Text style={styles.eventText}>{lifeEvent.label}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 12,
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  eventText: {
    fontSize: 16,
    color: '#424242',
    marginLeft: 8,
  },
});
