import { Lead, LeadGenerationOptions } from '../types';
import { generateRandomLead } from '../utils/leadGenerator';

class LeadServiceError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'LeadServiceError';
  }
}

const GENERATION_DELAY_MS = 1000;
const MAX_RETRIES = 3;

const simulateApiDelay = (ms: number = GENERATION_DELAY_MS): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

const validateGenerationOptions = (options: LeadGenerationOptions): void => {
  if (!options.zipCode) {
    throw new LeadServiceError('ZIP code is required', 'MISSING_ZIPCODE');
  }

  if (options.maxResults && options.maxResults <= 0) {
    throw new LeadServiceError('Max results must be greater than 0', 'INVALID_MAX_RESULTS');
  }
};

export const generateLead = async (options: LeadGenerationOptions): Promise<Lead> => {
  validateGenerationOptions(options);

  try {
    await simulateApiDelay();
    
    const lead = generateRandomLead();
    
    if (Math.random() < 0.05) {
      throw new LeadServiceError('Service temporarily unavailable', 'SERVICE_UNAVAILABLE');
    }
    
    return lead;
  } catch (error) {
    if (error instanceof LeadServiceError) {
      throw error;
    }
    throw new LeadServiceError('Failed to generate lead', 'GENERATION_FAILED');
  }
};

export const generateMultipleLeads = async (
  options: LeadGenerationOptions
): Promise<Lead[]> => {
  const maxResults = options.maxResults || 1;
  const leads: Lead[] = [];
  
  for (let i = 0; i < maxResults; i++) {
    try {
      const lead = await generateLead({ ...options, maxResults: 1 });
      leads.push(lead);
    } catch (error) {
      console.warn(`Failed to generate lead ${i + 1}:`, error);
    }
  }
  
  if (leads.length === 0) {
    throw new LeadServiceError('Failed to generate any leads', 'NO_LEADS_GENERATED');
  }
  
  return leads;
};

export const retryLeadGeneration = async (
  options: LeadGenerationOptions,
  retries: number = MAX_RETRIES
): Promise<Lead> => {
  let lastError: Error = new Error('Unknown error');
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await generateLead(options);
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < retries) {
        await simulateApiDelay(500 * attempt); 
      }
    }
  }
  
  throw new LeadServiceError(
    `Failed to generate lead after ${retries} attempts: ${lastError.message}`,
    'MAX_RETRIES_EXCEEDED'
  );
};