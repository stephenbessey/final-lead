import { useState, useCallback } from 'react';
import { Lead } from '../types';

export enum ButtonState {
  GENERATE = 'generate',
  GENERATING = 'generating',
  VIEW_DETAILS = 'view_details',
  NO_CREDITS = 'no_credits'
}

interface UseButtonStateReturn {
  buttonState: ButtonState;
  currentLead: Lead | null;
  handleGeneratePress: () => void;
  handleViewDetailsPress: () => void;
  handleLeadGenerated: (lead: Lead) => void;
  resetToGenerate: () => void;
}

export const useButtonState = (
  hasCredits: boolean,
  onGenerate: () => boolean,
  onViewDetails: (lead: Lead) => void
): UseButtonStateReturn => {
  const [buttonState, setButtonState] = useState<ButtonState>(
    hasCredits ? ButtonState.GENERATE : ButtonState.NO_CREDITS
  );
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);

  const handleGeneratePress = useCallback((): void => {
    if (!hasCredits) {
      setButtonState(ButtonState.NO_CREDITS);
      return;
    }

    const canGenerate = onGenerate();
    if (canGenerate) {
      setButtonState(ButtonState.GENERATING);
      setCurrentLead(null);
    }
  }, [hasCredits, onGenerate]);

  const handleLeadGenerated = useCallback((lead: Lead): void => {
    setCurrentLead(lead);
    setButtonState(ButtonState.VIEW_DETAILS);
  }, []);

  const handleViewDetailsPress = useCallback((): void => {
    if (currentLead) {
      onViewDetails(currentLead);
      resetToGenerate();
    }
  }, [currentLead, onViewDetails]);

  const resetToGenerate = useCallback((): void => {
    setCurrentLead(null);
    setButtonState(hasCredits ? ButtonState.GENERATE : ButtonState.NO_CREDITS);
  }, [hasCredits]);

  return {
    buttonState,
    currentLead,
    handleGeneratePress,
    handleViewDetailsPress,
    handleLeadGenerated,
    resetToGenerate,
  };
};