export const COLORS = {
  primary: '#2196F3',
  primaryLight: '#E3F2FD',
  primaryDark: '#1976D2',
  secondary: '#FF9800',
  secondaryLight: '#FFF3E0',
  accent: '#4CAF50',
  error: '#F44336',
  errorLight: '#FFEBEE',
  warning: '#FF9800',
  warningLight: '#FFF3E0',
  success: '#4CAF50',
  successLight: '#E8F5E8',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  divider: '#E0E0E0',
  textPrimary: '#212121',
  textSecondary: '#757575',
  textHint: '#9E9E9E',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const TYPOGRAPHY = {
  headline: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    lineHeight: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const BORDER_RADIUS = {
  small: 4,
  medium: 8,
  large: 12,
  circle: 50,
} as const;

export const SHADOWS = {
  small: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;