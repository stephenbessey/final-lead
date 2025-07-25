import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ActionButtonsProps {
  onExport: () => void;
  onBack: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onExport, onBack }) => (
  <View style={styles.section}>
    <Pressable style={[styles.button, styles.exportButton]} onPress={onExport}>
      <Ionicons name="share" size={20} color="#fff" />
      <Text style={styles.buttonText}>Export Lead Data</Text>
    </Pressable>
    
    <Pressable style={[styles.button, styles.backButton]} onPress={onBack}>
      <Text style={styles.buttonText}>Back to Generator</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  exportButton: {
    backgroundColor: '#4CAF50',
  },
  backButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});