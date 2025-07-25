import { Lead } from '../types';

export const formatLeadForExport = (lead: Lead): string => `
Lead Details:
Name: ${lead.name}
Phone: ${lead.phone}
Email: ${lead.email}
Address: ${lead.address}
Property Value: ${lead.propertyValue}
Client Type: ${lead.clientType}
Life Event: ${lead.lifeEvent}
Price Range: ${lead.priceRange}
`.trim();