import { Lead } from '../types';
import { getLifeEventDisplay } from './lifeEvents';

export const formatLeadForExport = (lead: Lead): string => {
  const lifeEvent = getLifeEventDisplay(lead.lifeEvent);
  
  return `
Lead Details:
Name: ${lead.name}
Phone: ${lead.phone}
Email: ${lead.email}
Address: ${lead.address}
Property Value: ${lead.propertyValue}
Client Type: ${lead.clientType}
Life Event: ${lifeEvent.label}
Price Range: ${lead.priceRange}
  `.trim();
};

export const formatLeadSummary = (lead: Lead): string => 
  `${lead.name} - ${lead.clientType} (${lead.priceRange})`;

export const formatLeadId = (lead: Lead): string => 
  `LEAD-${lead.id.slice(0, 8).toUpperCase()}`;