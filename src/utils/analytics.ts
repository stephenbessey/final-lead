interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp: number;
}

class AnalyticsService {
  private static instance: AnalyticsService;
  private events: AnalyticsEvent[] = [];

  private constructor() {}

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  public trackEvent(event: string, properties?: Record<string, any>): void {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: Date.now(),
    };

    this.events.push(analyticsEvent);
    console.log('Analytics Event:', analyticsEvent);

    // In a real app, you would send this to your analytics service
    this.sendToAnalyticsService(analyticsEvent);
  }

  public trackScreenView(screenName: string): void {
    this.trackEvent('screen_view', { screen_name: screenName });
  }

  public trackLeadGeneration(leadId: string, lifeEvent: string): void {
    this.trackEvent('lead_generated', {
      lead_id: leadId,
      life_event: lifeEvent,
    });
  }

  public trackContactAction(action: 'call' | 'sms' | 'email', leadId: string): void {
    this.trackEvent('contact_action', {
      action,
      lead_id: leadId,
    });
  }

  public trackPurchase(tier: string, price: number): void {
    this.trackEvent('purchase', {
      tier,
      price,
      currency: 'USD',
    });
  }

  private sendToAnalyticsService(event: AnalyticsEvent): void {
  }

  public getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  public clearEvents(): void {
    this.events = [];
  }
}

export const analytics = AnalyticsService.getInstance();
