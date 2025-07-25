export class AppError extends Error {
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(message: string, code: string, isOperational = true) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  INSUFFICIENT_CREDITS: 'INSUFFICIENT_CREDITS',
  LEAD_GENERATION_FAILED: 'LEAD_GENERATION_FAILED',
  CONTACT_ACTION_FAILED: 'CONTACT_ACTION_FAILED',
  STORAGE_ERROR: 'STORAGE_ERROR',
} as const;

export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(
      error.message,
      ERROR_CODES.NETWORK_ERROR,
      false
    );
  }

  return new AppError(
    'An unexpected error occurred',
    'UNKNOWN_ERROR',
    false
  );
};

export const getErrorMessage = (error: AppError): string => {
  switch (error.code) {
    case ERROR_CODES.NETWORK_ERROR:
      return 'Network connection failed. Please check your internet connection.';
    case ERROR_CODES.INVALID_INPUT:
      return 'Please check your input and try again.';
    case ERROR_CODES.INSUFFICIENT_CREDITS:
      return 'You don\'t have enough credits. Please purchase more credits.';
    case ERROR_CODES.LEAD_GENERATION_FAILED:
      return 'Failed to generate lead. Please try again.';
    case ERROR_CODES.CONTACT_ACTION_FAILED:
      return 'Unable to open contact app. Please try again.';
    case ERROR_CODES.STORAGE_ERROR:
      return 'Failed to save data. Please try again.';
    default:
      return error.message || 'An unexpected error occurred.';
  }
};