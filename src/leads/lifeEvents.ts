import { LifeEvent, LIFE_EVENT_LABELS } from '../types';

export { LifeEvent, LIFE_EVENT_LABELS };

export const getLifeEventDisplay = (lifeEvent: LifeEvent): string => {
  return LIFE_EVENT_LABELS[lifeEvent] || lifeEvent;
};

export const getAllLifeEvents = (): LifeEvent[] => {
  return Object.keys(LIFE_EVENT_LABELS) as LifeEvent[];
};

export const getLifeEventIcon = (lifeEvent: LifeEvent): string => {
  const icons: Record<LifeEvent, string> = {
    baby: '👶',
    death: '💐',
    married: '💍',
    'house-sold': '🏠',
    divorced: '💔',
  };
  
  return icons[lifeEvent];
};
