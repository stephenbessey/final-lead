import { Lead } from '../types';
import { generateRandomLead } from '../utils/leadGenerator';

class LeadService {
  private static instance: LeadService;

  private constructor() {}

  public static getInstance(): LeadService {
    if (!LeadService.instance) {
      LeadService.instance = new LeadService();
    }
    return LeadService.instance;
  }

  public async generateLead(zipCode: string): Promise<Lead> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const lead = generateRandomLead();
          resolve(lead);
        } catch (error) {
          reject(new Error('Failed to generate lead'));
        }
      }, 1000);
    });
  }

  public validateLead(lead: Lead): boolean {
    return !!(
      lead.id &&
      lead.name &&
      lead.phone &&
      lead.email &&
      lead.address &&
      lead.propertyValue &&
      lead.lifeEvent &&
      lead.clientType &&
      lead.priceRange
    );
  }
}

export const leadService = LeadService.getInstance();
