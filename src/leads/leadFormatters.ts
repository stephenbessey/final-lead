import { Lead } from '../types';
import { getLifeEventDisplay } from './lifeEvents';

export const formatLeadForExport = (lead: Lead): string => {
  const clientTypeLabels = {
    buyer: 'Buyer',
    seller: 'Seller',
  };

  const priceRangeLabels = {
    '$': 'Budget',
    '$$': 'Mid-Range',
    '$$$': 'Premium',
  };

  return `
Lead Information:
================
Name: ${lead.name}
Phone: ${lead.phone}
Email: ${lead.email}
Address: ${lead.address}
Property Value: ${lead.propertyValue}
Life Event: ${getLifeEventDisplay(lead.lifeEvent)}
Client Type: ${clientTypeLabels[lead.clientType]}
Price Range: ${priceRangeLabels[lead.priceRange]}
Generated: ${lead.createdAt?.toLocaleDateString() || 'Unknown'}
Lead ID: ${lead.id}
================
  `.trim();
};

export const formatLeadSummary = (lead: Lead): string => 
  `${lead.name} - ${getLifeEventDisplay(lead.lifeEvent)} - ${lead.propertyValue}`;

export const formatLeadForCsv = (leads: Lead[]): string => {
  const headers = [
    'ID', 'Name', 'Phone', 'Email', 'Address', 'Property Value',
    'Life Event', 'Client Type', 'Price Range', 'Created At'
  ].join(',');

  const rows = leads.map(lead => [
    lead.id,
    `"${lead.name}"`,
    `"${lead.phone}"`,
    lead.email,
    `"${lead.address}"`,
    `"${lead.propertyValue}"`,
    getLifeEventDisplay(lead.lifeEvent),
    lead.clientType,
    lead.priceRange,
    lead.createdAt?.toISOString() || '',
  ].join(','));

  return [headers, ...rows].join('\n');
};