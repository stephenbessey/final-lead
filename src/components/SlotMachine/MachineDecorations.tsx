import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';
import { SLOT_MACHINE_TEXTS } from '../../constants/slotMachine';

export const MachineDecorations: React.FC = () => (
  <View style={decorationStyles.footer}>
    <View style={decorationStyles.coinSlot}>
      <Text style={decorationStyles.coinSlotText}>{SLOT_MACHINE_TEXTS.coinSlot}</Text>
    </View>
    <View style={decorationStyles.decorativeLights}>
      {SLOT_MACHINE_TEXTS.decorativeLights.map((light, index) => (
        <Text key={index} style={decorationStyles.light}>{light}</Text>
      ))}
    </View>
  </View>
);

const decorationStyles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  coinSlot: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 20,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  coinSlotText: {
    fontSize: 18,
  },
  decorativeLights: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  light: {
    fontSize: 16,
  },
});
