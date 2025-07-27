import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SlotMachineFrameProps } from '../../types/slotMachine';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../../constants/theme';
import { SLOT_MACHINE_CONFIG, SLOT_MACHINE_TEXTS } from '../../constants/slotMachine';

export const SlotMachineFrame: React.FC<SlotMachineFrameProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{SLOT_MACHINE_TEXTS.machineTitle}</Text>
        <View style={styles.lightsContainer}>
          {SLOT_MACHINE_TEXTS.decorativeLights.map((light, index) => (
            <Text key={index} style={styles.light}>{light}</Text>
          ))}
        </View>
      </View>
      
      <View style={styles.frame}>
        <View style={styles.reelsContainer}>
          {children}
        </View>
        
        <View style={styles.coinSlot}>
          <Text style={styles.coinIcon}>{SLOT_MACHINE_TEXTS.coinSlot}</Text>
        </View>
      </View>
      
      <View style={styles.base} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.headline,
    color: COLORS.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  lightsContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  light: {
    fontSize: 16,
  },
  frame: {
    backgroundColor: COLORS.primary,
    borderRadius: SLOT_MACHINE_CONFIG.machine.borderRadius,
    borderWidth: SLOT_MACHINE_CONFIG.machine.borderWidth,
    borderColor: COLORS.primaryDark,
    padding: SPACING.lg,
    minWidth: SLOT_MACHINE_CONFIG.machine.minWidth,
    ...SHADOWS.large,
  },
  reelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  coinSlot: {
    alignSelf: 'center',
    backgroundColor: COLORS.primaryDark,
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  coinIcon: {
    fontSize: 20,
    textAlign: 'center',
  },
  base: {
    width: SLOT_MACHINE_CONFIG.machine.minWidth + 40,
    height: 20,
    backgroundColor: COLORS.primaryDark,
    borderRadius: 10,
    marginTop: SPACING.sm,
  },
});