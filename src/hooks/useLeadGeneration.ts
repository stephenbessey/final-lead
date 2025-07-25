import { useState } from 'react';
import { Lead, LeadGenerationOptions } from '../types';
import { generateLead } from '../services/leadService';

interface UseLeadGenerationResult {
  lead: Lead | null;
  isLoading: boolean;
  error: string | null;
  generateNewLead: (options: LeadGenerationOptions) => Promise<void>;
  clearLead: () => void;
}

export const useLeadGeneration = (): UseLeadGenerationResult => {
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateNewLead = async (options: LeadGenerationOptions): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const newLead = await generateLead(options);
      setLead(newLead);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate lead');
    } finally {
      setIsLoading(false);
    }
  };

  const clearLead = (): void => {
    setLead(null);
    setError(null);
  };

  return {
    lead,
    isLoading,
    error,
    generateNewLead,
    clearLead,
  };
};
