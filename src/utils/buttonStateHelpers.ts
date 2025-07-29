import { ButtonState } from '../hooks/useButtonState';
import { SLOT_MACHINE_TEXTS } from '../constants/slotMachine';

export const getButtonText = (buttonState: ButtonState): string => {
  const textMap: Record<ButtonState, string> = {
    [ButtonState.GENERATE]: SLOT_MACHINE_TEXTS.buttons.generate,
    [ButtonState.GENERATING]: SLOT_MACHINE_TEXTS.buttons.generating,
    [ButtonState.VIEW_DETAILS]: SLOT_MACHINE_TEXTS.buttons.viewDetails,
    [ButtonState.NO_CREDITS]: SLOT_MACHINE_TEXTS.buttons.noCredits,
  };
  
  return textMap[buttonState] || SLOT_MACHINE_TEXTS.buttons.generate;
};

export const isButtonDisabled = (buttonState: ButtonState): boolean => {
  return buttonState === ButtonState.NO_CREDITS || 
         buttonState === ButtonState.GENERATING;
};

export const shouldShowViewDetailsAction = (buttonState: ButtonState): boolean => {
  return buttonState === ButtonState.VIEW_DETAILS;
};