import { SLOT_MACHINE_CONFIG, SLOT_MACHINE_TEXTS, SLOT_MACHINE_EMOJIS, LEAD_TO_EMOJI_MAP } from '../constants/slotMachine';
import { Lead } from '../types';

export const createExtendedEmojiList = (emojis: readonly string[]): string[] => {
  return Array(SLOT_MACHINE_CONFIG.reel.repetitions).fill(emojis).flat();
};

export const calculateReelHeight = (): number => {
  return SLOT_MACHINE_CONFIG.reel.visibleItems * SLOT_MACHINE_CONFIG.reel.itemHeight;
};

export const calculateSpinDistance = (emojis: readonly string[], finalIndex: number): number => {
  const itemHeight = SLOT_MACHINE_CONFIG.reel.itemHeight;
  const visibleItems = SLOT_MACHINE_CONFIG.reel.visibleItems;
  
  const safeIndex = Math.max(0, Math.min(finalIndex, emojis.length - 1));
  
  const centerOffset = Math.floor(visibleItems / 2) * itemHeight;
  const targetPosition = safeIndex * itemHeight;
  
  const spinCycles = 3;
  const fullCycleDistance = emojis.length * itemHeight;
  const totalSpinDistance = spinCycles * fullCycleDistance;
  
  return -(totalSpinDistance + targetPosition - centerOffset);
};

export const generateLeadBasedIndices = (lead: Lead): number[] => [
  LEAD_TO_EMOJI_MAP.lifeEvents[lead.lifeEvent],
  LEAD_TO_EMOJI_MAP.priceRanges[lead.priceRange],
  LEAD_TO_EMOJI_MAP.clientTypes[lead.clientType],
];

export const generateRandomFinalIndices = (): number[] => [
  Math.floor(Math.random() * SLOT_MACHINE_EMOJIS.lifeEvents.length),
  Math.floor(Math.random() * SLOT_MACHINE_EMOJIS.priceRanges.length),
  Math.floor(Math.random() * SLOT_MACHINE_EMOJIS.clientTypes.length),
];

export const getButtonText = (disabled: boolean, isSpinning: boolean): string => {
  if (disabled) return SLOT_MACHINE_TEXTS.buttons.noCredits;
  if (isSpinning) return SLOT_MACHINE_TEXTS.buttons.generating;
  return SLOT_MACHINE_TEXTS.buttons.generate;
};
