import { Lead, LeadGenerationOptions } from '../types';

export const generateLead = async (options: LeadGenerationOptions): Promise<Lead> => {
  const mockLeads: Lead[] = [
    {
      id: '1',
      name: 'John Smith',
      phone: '(555) 123-4567',
      email: 'john.smith@email.com',
      address: '123 Main St, Springfield',
      propertyValue: '$450,000',
      lifeEvent: 'baby',
      clientType: 'buyer',
      priceRange: '$$',
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      phone: '(555) 987-6543',
      email: 'sarah.j@email.com',
      address: '456 Oak Ave, Springfield',
      propertyValue: '$320,000',
      lifeEvent: 'married',
      clientType: 'seller',
      priceRange: '$',
      createdAt: new Date(),
    },
  ];

  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const randomLead = mockLeads[Math.floor(Math.random() * mockLeads.length)];
  return {
    ...randomLead,
    id: Date.now().toString(),
    createdAt: new Date(),
  };
};

export const validateLeadData = (lead: Partial<Lead>): boolean => {
  return !!(lead.name && lead.phone && lead.email && lead.address);
};