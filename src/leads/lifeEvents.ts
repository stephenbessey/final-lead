import { LifeEvent } from '../types';

export interface LifeEventDisplay {
  icon: string;
  label: string;
}

const LIFE_EVENT_DISPLAYS: Record<LifeEvent, LifeEventDisplay> = {
  baby: { icon: 'baby', label: 'New Baby' },
  death: { icon: 'flower', label: 'Death in Family' },
  married: { icon: 'heart', label: 'Recently Married' },
  'house-sold': { icon: 'home', label: 'House Sold Nearby' },
  divorced: { icon: 'heart-broken', label: 'Recently Divorced' },
};

export const getLifeEventDisplay = (event: LifeEvent): LifeEventDisplay => 
  LIFE_EVENT_DISPLAYS[event] || { icon: 'help', label: 'Unknown' };

export const isValidLifeEvent = (event: string): event is LifeEvent => 
  Object.keys(LIFE_EVENT_DISPLAYS).includes(event);

export const getAllLifeEvents = (): LifeEvent[] => 
  Object.keys(LIFE_EVENT_DISPLAYS) as LifeEvent[];