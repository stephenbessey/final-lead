export const SLOT_MACHINE_CONFIG = {
  animation: {
    duration: 3000,
    reelStaggerDelay: 400,
    generationDelay: 2500,
    spinCycles: 3, 
    vibrationCycles: 15,
  },
  reel: {
    visibleItems: 3,
    itemHeight: 70,
    repetitions: 3,
    width: 80,
  },
  machine: {
    minWidth: 300,
    borderRadius: 24,
    borderWidth: 4,
  },
  button: {
    minWidth: 220,
    fontSize: 16,
  },
} as const;

export const SLOT_MACHINE_TEXTS = {
  machineTitle: '🎰 LEAD GENERATOR 🎰',
  coinSlot: '💰',
  decorativeLights: ['✨', '⭐', '✨'],
  statusMessage: '🎲 Finding your perfect lead...',
  buttons: {
    noCredits: 'No Credits',
    generating: 'Generating...',
    generate: 'Generate Lead',
  },
} as const;

export const SLOT_MACHINE_EMOJIS = {
  lifeEvents: ['👶', '⚰️', '💒', '🏠', '💔'],
  priceRanges: ['💵', '💰', '💎'],
  clientTypes: ['🛒', '📋'],
} as const;

export const LEAD_TO_EMOJI_MAP = {
  lifeEvents: {
    'baby': 0,
    'death': 1,
    'married': 2,
    'house-sold': 3,
    'divorced': 4,
  },
  priceRanges: {
    '$': 0,
    '$$': 1,
    '$$$': 2,
  },
  clientTypes: {
    'buyer': 0,
    'seller': 1,
  },
} as const;