import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LeadContactInfoProps {
  lead: any;
}

export const LeadContactInfo: React.FC<LeadContactInfoProps> = ({ lead }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Contact Information</Text>
    <InfoRow icon="call" label="Phone" value={lead.phone} />
    <InfoRow icon="mail" label="Email" value={lead.email} />
    <InfoRow icon="location" label="Address" value={lead.address} />
    <InfoRow icon="home" label="Property Value" value={lead.propertyValue} />
  </View>
);

interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon as any} size={20} color="#757575" />
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoContent: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#424242',
    fontWeight: '500',
  },
});
