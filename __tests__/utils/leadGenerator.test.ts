import { generateRandomLead, formatLeadForExport } from '../../src/utils/leadGenerator';
import { Lead } from '../../src/types';

describe('leadGenerator', () => {
  describe('generateRandomLead', () => {
    it('should generate a valid lead with all required fields', () => {
      const lead = generateRandomLead();
      
      expect(lead.id).toBeDefined();
      expect(typeof lead.id).toBe('string');
      expect(lead.id.length).toBeGreaterThan(0);
      
      expect(lead.name).toBeDefined();
      expect(typeof lead.name).toBe('string');
      expect(lead.name.length).toBeGreaterThan(0);
      
      expect(lead.phone).toMatch(/^\(\d{3}\) \d{3}-\d{4}$/);
      expect(lead.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      
      expect(lead.address).toBeDefined();
      expect(typeof lead.address).toBe('string');
      
      expect(lead.propertyValue).toMatch(/^\$[\d,]+$/);
      
      expect(['baby', 'death', 'married', 'house-sold', 'divorced']).toContain(lead.lifeEvent);
      expect(['buyer', 'seller']).toContain(lead.clientType);
      expect(['$', '$$', '$$$']).toContain(lead.priceRange);
      
      expect(lead.createdAt).toBeInstanceOf(Date);
    });

    it('should generate unique leads', () => {
      const lead1 = generateRandomLead();
      const lead2 = generateRandomLead();
      
      expect(lead1.id).not.toBe(lead2.id);
    });

    it('should generate leads with valid phone numbers', () => {
      const lead = generateRandomLead();
      const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
      expect(phoneRegex.test(lead.phone)).toBe(true);
    });

    it('should generate leads with valid email addresses', () => {
      const lead = generateRandomLead();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(lead.email)).toBe(true);
    });
  });

  describe('formatLeadForExport', () => {
    it('should format lead data correctly', () => {
      const mockLead: Lead = {
        id: 'test123',
        name: 'John Doe',
        phone: '(555) 123-4567',
        email: 'john@example.com',
        address: '123 Main St',
        propertyValue: '$300,000',
        lifeEvent: 'baby',
        clientType: 'buyer',
        priceRange: '$',
        createdAt: new Date('2023-01-01'),
      };

      const formatted = formatLeadForExport(mockLead);
      
      expect(formatted).toContain('John Doe');
      expect(formatted).toContain('(555) 123-4567');
      expect(formatted).toContain('john@example.com');
      expect(formatted).toContain('123 Main St');
      expect(formatted).toContain('$300,000');
      expect(formatted).toContain('New Baby');
      expect(formatted).toContain('Buyer');
      expect(formatted).toContain('Budget');
      expect(formatted).toContain('test123');
    });

    it('should handle leads without createdAt date', () => {
      const mockLead: Lead = {
        id: 'test456',
        name: 'Jane Smith',
        phone: '(555) 987-6543',
        email: 'jane@example.com',
        address: '456 Oak Ave',
        propertyValue: '$500,000',
        lifeEvent: 'married',
        clientType: 'seller',
        priceRange: '$$',
      };

      const formatted = formatLeadForExport(mockLead);
      
      expect(formatted).toContain('Jane Smith');
      expect(formatted).toContain('Recently Married');
      expect(formatted).toContain('Seller');
      expect(formatted).toContain('Mid-Range');
      expect(formatted).toContain('Unknown');
    });

    it('should include all life event types correctly', () => {
      const lifeEvents: Array<Lead['lifeEvent']> = ['baby', 'death', 'married', 'house-sold', 'divorced'];
      const expectedLabels = ['New Baby', 'Death in Family', 'Recently Married', 'House Sold Nearby', 'Recently Divorced'];
      
      lifeEvents.forEach((lifeEvent, index) => {
        const mockLead: Lead = {
          id: `test${index}`,
          name: 'Test Name',
          phone: '(555) 123-4567',
          email: 'test@example.com',
          address: '123 Test St',
          propertyValue: '$200,000',
          lifeEvent,
          clientType: 'buyer',
          priceRange: ',
          createdAt: new Date(),
        };
        
        const formatted = formatLeadForExport(mockLead);
        expect(formatted).toContain(expectedLabels[index]);
      });
    });
  });

  describe('edge cases', () => {
    it('should handle multiple lead generation without conflicts', () => {
      const leads = Array.from({ length: 10 }, () => generateRandomLead());
      const ids = leads.map(lead => lead.id);
      const uniqueIds = new Set(ids);
      
      expect(uniqueIds.size).toBe(leads.length);
    });

    it('should generate realistic property values', () => {
      const lead = generateRandomLead();
      const value = lead.propertyValue.replace(/[$,]/g, '');
      const numericValue = parseInt(value, 10);
      
      expect(numericValue).toBeGreaterThan(100000);
      expect(numericValue).toBeLessThan(1000000);
    });
  });
});