import { LifeEvent, LIFE_EVENT_LABELS } from '../types';

export const getLifeEventDisplay = (lifeEvent: LifeEvent): string => 
  LIFE_EVENT_LABELS[lifeEvent];

export const getAllLifeEvents = (): LifeEvent[] => 
  Object.keys(LIFE_EVENT_LABELS) as LifeEvent[];

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
