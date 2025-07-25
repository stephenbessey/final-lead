import { Lead, LeadGenerationOptions, ValidationResult } from '../types';
import { generateRandomLead } from '../utils/leadGenerator';
import { validateLead } from '../utils/validation';

export class LeadServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'LeadServiceError';
  }
}

export class LeadValidationError extends LeadServiceError {
  constructor(message: string, public validationErrors: readonly string[]) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'LeadValidationError';
  }
}

class LeadService {
  private static instance: LeadService;
  private readonly timeout = 10000;

  private constructor() {}

  public static getInstance(): LeadService {
    if (!LeadService.instance) {
      LeadService.instance = new LeadService();
    }
    return LeadService.instance;
  }

  public async generateLead(options: LeadGenerationOptions): Promise<Lead> {
    try {
      this.validateGenerationOptions(options);
      const lead = await this.performLeadGeneration(options);
      
      const validation = validateLead(lead);
      if (!validation.isValid) {
        throw new LeadValidationError(
          'Generated lead failed validation',
          validation.errors
        );
      }

      return lead;
    } catch (error) {
      if (error instanceof LeadServiceError) {
        throw error;
      }
      
      throw new LeadServiceError(
        'Failed to generate lead',
        'GENERATION_ERROR',
        500
      );
    }
  }

  public validateLead(lead: Lead): ValidationResult {
    return validateLead(lead);
  }

  public async batchGenerateLeads(
    options: LeadGenerationOptions, 
    count: number = 5
  ): Promise<Lead[]> {
    if (count <= 0 || count > 50) {
      throw new LeadServiceError(
        'Count must be between 1 and 50',
        'INVALID_COUNT'
      );
    }

    const leads: Lead[] = [];
    const promises = Array.from({ length: count }, () => 
      this.generateLead(options)
    );

    try {
      const results = await Promise.allSettled(promises);
      
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          leads.push(result.value);
        } else {
          console.warn(`Failed to generate lead ${index + 1}:`, result.reason);
        }
      });

      if (leads.length === 0) {
        throw new LeadServiceError(
          'Failed to generate any leads',
          'BATCH_GENERATION_FAILED'
        );
      }

      return leads;
    } catch (error) {
      throw new LeadServiceError(
        'Batch lead generation failed',
        'BATCH_ERROR'
      );
    }
  }

  public async getLeadStatistics(): Promise<{
    totalLeads: number;
    averagePropertyValue: number;
    topLifeEvents: string[];
    marketTrends: string[];
  }> {
    try {
      await this.delay(1000);
      
      return {
        totalLeads: Math.floor(Math.random() * 500) + 100,
        averagePropertyValue: Math.floor(Math.random() * 300000) + 200000,
        topLifeEvents: ['married', 'house-sold', 'baby'],
        marketTrends: ['Rising prices', 'High demand', 'Low inventory'],
      };
    } catch (error) {
      throw new LeadServiceError(
        'Failed to fetch lead statistics',
        'STATISTICS_ERROR'
      );
    }
  }

  private validateGenerationOptions(options: LeadGenerationOptions): void {
    if (!options.zipCode || options.zipCode.trim().length === 0) {
      throw new LeadServiceError(
        'ZIP code is required',
        'MISSING_ZIP_CODE'
      );
    }

    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(options.zipCode.trim())) {
      throw new LeadServiceError(
        'Invalid ZIP code format',
        'INVALID_ZIP_CODE'
      );
    }

    if (options.maxResults && (options.maxResults < 1 || options.maxResults > 100)) {
      throw new LeadServiceError(
        'Max results must be between 1 and 100',
        'INVALID_MAX_RESULTS'
      );
    }
  }

  private async performLeadGeneration(options: LeadGenerationOptions): Promise<Lead> {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * 2000 + 1000;
      
      const timeoutId = setTimeout(() => {
        reject(new LeadServiceError(
          'Request timeout',
          'TIMEOUT',
          408
        ));
      }, this.timeout);

      setTimeout(() => {
        clearTimeout(timeoutId);
        
        try {
          const lead = generateRandomLead();
          
          if (options.clientType) {
            lead.clientType = options.clientType;
          }
          if (options.priceRange) {
            lead.priceRange = options.priceRange;
          }
          
          resolve(lead);
        } catch (error) {
          reject(new LeadServiceError(
            'Lead generation failed',
            'GENERATION_ERROR'
          ));
        }
      }, delay);
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const leadService = LeadService.getInstance();