import { generateRandomLead, formatLeadForExport } from '../../src/utils/leadGenerator';

describe('leadGenerator', () => {
  describe('generateRandomLead', () => {
    it('should generate a valid lead with all required fields', () => {
      const lead = generateRandomLead();
      
      expect(lead.id).toBeDefined();
      expect(lead.name).toBeDefined();
      expect(lead.phone).toMatch(/^\(\d{3}\) \d{3}-\d{4}$/);
      expect(lead.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(lead.address).toBeDefined();
      expect(lead.propertyValue).toMatch(/^\$[\d,]+$/);
      expect(['baby', 'death', 'married', 'house-sold', 'divorced']).toContain(lead.lifeEvent);
      expect(['buyer', 'seller']).toContain(lead.clientType);
      expect([', '$', '$]).toContain(lead.priceRange);
    });

    it('should generate unique leads', () => {
      const lead1 = generateRandomLead();
      const lead2 = generateRandomLead();
      
      expect(lead1.id).not.toBe(lead2.id);
    });
  });

  describe('formatLeadForExport', () => {
    it('should format lead data correctly', () => {
      const mockLead = {
        id: 'test123',
        name: 'John Doe',
        phone: '(555) 123-4567',
        email: 'john@example.com',
        address: '123 Main St',
        propertyValue: '$300,000',
        lifeEvent: 'baby' as const,
        clientType: 'buyer' as const,
        priceRange: '$' as const,
      };

      const formatted = formatLeadForExport(mockLead);
      
      expect(formatted).toContain('John Doe');
      expect(formatted).toContain('(555) 123-4567');
      expect(formatted).toContain('john@example.com');
      expect(formatted).toContain('New Baby');
      expect(formatted).toContain('Buyer');
    });
  });
});