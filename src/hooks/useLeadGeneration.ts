import { useState, useCallback } from 'react';
import { Lead } from '../types';
import { generateRandomLead } from '../utils/leadGenerator';

interface UseLeadGenerationReturn {
  isGenerating: boolean;
  currentLead: Lead | null;
  generateLead: () => Promise<Lead>;
  clearLead: () => void;
}

export const useLeadGeneration = (): UseLeadGenerationReturn => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);

  const generateLead = useCallback(async (): Promise<Lead> => {
    setIsGenerating(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const newLead = generateRandomLead();
        setCurrentLead(newLead);
        setIsGenerating(false);
        resolve(newLead);
      }, 3000); 
    });
  }, []);

  const clearLead = useCallback((): void => {
    setCurrentLead(null);
  }, []);

  return {
    isGenerating,
    currentLead,
    generateLead,
    clearLead,
  };
};
