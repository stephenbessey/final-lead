// Color palette following Material Design 3 principles
export const COLORS = {
  // Primary colors
  primary: '#2196F3',
  primaryVariant: '#1976D2',
  primaryLight: '#E3F2FD',
  primaryDark: '#1976D2', // Added missing property
  
  // Secondary colors
  secondary: '#4CAF50',
  secondaryVariant: '#388E3C',
  secondaryLight: '#E8F5E8',
  secondaryDark: '#388E3C', // Added missing property
  
  // Error colors
  error: '#F44336',
  errorVariant: '#D32F2F',
  errorLight: '#FFEBEE',
  
  // Warning colors
  warning: '#FF9800',
  warningVariant: '#F57C00',
  warningLight: '#FFF3E0',
  
  // Surface colors
  background: '#F5F5F5',
  surface: '#FFFFFF',
  surfaceVariant: '#FAFAFA',
  
  // Text colors
  textPrimary: '#212121',
  textSecondary: '#757575',
  textLight: '#BDBDBD',
  textOnPrimary: '#FFFFFF',
  textOnSecondary: '#FFFFFF',
  
  // Border colors
  border: '#E0E0E0',
  borderFocus: '#2196F3',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Transparent
  transparent: 'transparent',
} as const;

// Typography scale
export const TYPOGRAPHY = {
  // Headings
  headline: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '500' as const,
    lineHeight: 28,
  },
  h3: { // Added missing h3 property
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  
  // Body text
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  body1: { // Added missing body1 property
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  body2: { // Added missing body2 property
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  
  // Labels and captions
  label: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  
  // Interactive elements
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
  input: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
} as const;

// Spacing scale (8dp grid)
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

// Border radius
export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

// Shadows (elevation)
export const SHADOWS = {
  none: {
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  small: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  medium: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  large: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
} as const;

// Animation durations
export const ANIMATIONS = {
  fast: 150,
  normal: 250,
  slow: 350,
  extraSlow: 500,
} as const;

// Breakpoints for responsive design
export const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
} as const;

// Z-index scale
export const Z_INDEX = {
  background: -1,
  default: 0,
  dropdown: 1000,
  modal: 2000,
  overlay: 3000,
  toast: 4000,
} as const;