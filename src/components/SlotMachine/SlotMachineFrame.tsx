import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SlotMachineFrameProps } from '../../types/slotMachine';
import { MachineDecorations } from './MachineDecorations';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../../constants/theme';
import { SLOT_MACHINE_TEXTS, SLOT_MACHINE_CONFIG } from '../../constants/slotMachine';

export const SlotMachineFrame: React.FC<SlotMachineFrameProps> = ({ children }) => (
  <View style={frameStyles.frame}>
    <View style={frameStyles.header}>
      <Text style={frameStyles.title}>{SLOT_MACHINE_TEXTS.machineTitle}</Text>
    </View>
    
    <View style={frameStyles.reelsContainer}>
      {children}
    </View>
    
    <MachineDecorations />
  </View>
);

const frameStyles = StyleSheet.create({
  frame: {
    backgroundColor: COLORS.surface,
    borderRadius: SLOT_MACHINE_CONFIG.machine.borderRadius,
    padding: SPACING.lg,
    ...SHADOWS.large,
    borderWidth: SLOT_MACHINE_CONFIG.machine.borderWidth,
    borderColor: COLORS.primary,
    minWidth: SLOT_MACHINE_CONFIG.machine.minWidth,
  },
  header: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  reelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
});