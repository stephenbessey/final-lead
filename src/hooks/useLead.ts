import { useCallback, useRef } from 'react';
import { Lead } from '../types';
import { generateRandomLead } from '../utils/leadGenerator';
import { generateLeadBasedIndices } from '../utils/slotMachineHelpers';
import { SLOT_MACHINE_CONFIG } from '../constants/slotMachine';

export const useLead = (
  onResult: (lead: Lead) => void, 
  onIndicesGenerated: (indices: number[]) => void
) => {
  const generatedLead = useRef<Lead | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isGenerationComplete = useRef(false);

  const generateLeadWithDelay = useCallback((): void => {
    isGenerationComplete.current = false;
    
    const lead = generateRandomLead();
    generatedLead.current = lead;
    
    const indices = generateLeadBasedIndices(lead);
    onIndicesGenerated(indices);
    
    timeoutRef.current = setTimeout(() => {
      if (!isGenerationComplete.current) {
        isGenerationComplete.current = true;
        onResult(lead);
      }
    }, SLOT_MACHINE_CONFIG.animation.generationDelay);
  }, [onResult, onIndicesGenerated]);

  const triggerEarlyResult = useCallback((): void => {
    if (generatedLead.current && !isGenerationComplete.current) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      isGenerationComplete.current = true;
      onResult(generatedLead.current);
    }
  }, [onResult]);

  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return { 
    generateLeadWithDelay, 
    triggerEarlyResult,
    generatedLead: generatedLead.current,
    cleanup,
  };
};