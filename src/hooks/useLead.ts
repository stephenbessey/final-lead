import { useCallback, useRef } from 'react';
import { Lead } from '../types';
import { generateRandomLead } from '../utils/leadGenerator';
import { generateLeadBasedIndices } from '../utils/slotMachineHelpers';
import { SLOT_MACHINE_CONFIG } from '../constants/slotMachine';

export const useLead = (onResult: (lead: Lead) => void, onIndicesGenerated: (indices: number[]) => void) => {
  const generatedLead = useRef<Lead | null>(null);

  const generateLeadWithDelay = useCallback((): void => {
    const lead = generateRandomLead();
    generatedLead.current = lead;
    
    const indices = generateLeadBasedIndices(lead);
    onIndicesGenerated(indices);
    
    setTimeout(() => {
      onResult(lead);
    }, SLOT_MACHINE_CONFIG.animation.generationDelay);
  }, [onResult, onIndicesGenerated]);

  return { generateLeadWithDelay, generatedLead: generatedLead.current };
};