import { SLOT_MACHINE_CONFIG, SLOT_MACHINE_TEXTS, SLOT_MACHINE_EMOJIS, LEAD_TO_EMOJI_MAP } from '../constants/slotMachine';
import { Lead } from '../types';

export const createExtendedEmojiList = (emojis: readonly string[]): string[] => {
  return Array(SLOT_MACHINE_CONFIG.reel.repetitions).fill(emojis).flat();
};

export const calculateReelHeight = (): number => {
  return SLOT_MACHINE_CONFIG.reel.visibleItems * SLOT_MACHINE_CONFIG.reel.itemHeight;
};

export const calculateSpinDistance = (extendedEmojis: string[], finalIndex: number): number => {
  const itemHeight = SLOT_MACHINE_CONFIG.reel.itemHeight;
  const visibleItems = SLOT_MACHINE_CONFIG.reel.visibleItems;
  const originalEmojisLength = extendedEmojis.length / SLOT_MACHINE_CONFIG.reel.repetitions;
  
  // Ensure finalIndex is within bounds of original emoji array
  const safeIndex = Math.max(0, Math.min(finalIndex, originalEmojisLength - 1));
  
  // Calculate center position offset (middle of visible window)
  const centerOffset = Math.floor(visibleItems / 2) * itemHeight;
  
  // We want to stop at a position where the target emoji is in the center
  // Find a good stopping position in one of the middle repetitions (not the last one)
  const targetRepetition = Math.floor(SLOT_MACHINE_CONFIG.reel.repetitions / 2); // Use middle repetition
  const targetPositionInExtended = (targetRepetition * originalEmojisLength + safeIndex) * itemHeight;
  
  // Add some spinning for visual effect (2-3 full cycles through original emoji set)
  const spinCycles = 3;
  const originalArrayDistance = originalEmojisLength * itemHeight;
  const extraSpinDistance = spinCycles * originalArrayDistance;
  
  // Calculate total distance: extra spins + position to target emoji - center offset
  // The paddingTop from Reel component also affects positioning
  const paddingTopOffset = itemHeight; // This matches the paddingTop in Reel component
  const totalDistance = extraSpinDistance + targetPositionInExtended - centerOffset - paddingTopOffset;
  
  // Return negative value because we're moving the content up
  return -totalDistance;
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