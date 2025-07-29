import { useCallback } from 'react';
import { ButtonState } from './useButtonState';
import { shouldShowViewDetailsAction } from '../utils/buttonStateHelpers';

interface UseButtonActionsProps {
  buttonState: ButtonState;
  onGeneratePress: () => void;
  onViewDetailsPress: () => void;
}

export const useButtonActions = ({
  buttonState,
  onGeneratePress,
  onViewDetailsPress,
}: UseButtonActionsProps) => {
  
  const handlePress = useCallback((): void => {
    if (shouldShowViewDetailsAction(buttonState)) {
      onViewDetailsPress();
      return;
    }
    
    if (buttonState === ButtonState.GENERATE) {
      onGeneratePress();
    }
  }, [buttonState, onGeneratePress, onViewDetailsPress]);

  return { handlePress };
};