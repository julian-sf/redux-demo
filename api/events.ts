import { EventData } from '../server/data/events';

import { HOST } from './index';

export type EventList = EventData[];

export type NormalizedEvent = Omit<EventData, 'relatedEvents'> & { relatedEvents: string[] };

export interface NormalizedEvents {
  [id: string]: NormalizedEvent;
}

export const fetchEvents = async (): Promise<EventList> => {
  if (typeof fetch === 'undefined') return [];

  const response = await fetch(`${HOST}/events`, { credentials: 'include' });

  return await response.json();
};
