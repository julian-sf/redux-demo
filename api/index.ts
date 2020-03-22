import { EventData } from '../server/data/events';

const HOST = 'http://localhost:3333';

export interface Events {
  [id: string]: EventData;
}

export const transformEventResponse = (events: EventData[]): Events => {
  return events.reduce((accumulator, event, index, array) => {
    accumulator[event.id] = event;

    if (index === 0) {
      event.relatedEvents = [array[index + 1]?.id, array[index + 2]?.id];
    } else if (index === array.length - 1) {
      event.relatedEvents = [array[index - 2]?.id, array[index - 1]?.id];
    } else {
      event.relatedEvents = [array[index - 1]?.id, array[index + 1]?.id];
    }

    event.relatedEvents = event.relatedEvents.filter(related => !!related);

    return accumulator;
  }, {});
};

export const fetchEvents = async () => {
  if (typeof fetch === 'undefined') return {};

  const response = await fetch(`${HOST}/events`, { credentials: 'include' });

  return transformEventResponse(await response.json());
};

export const fetchUserStatus = async (): Promise<{ user?: string }> => {
  if (typeof fetch === 'undefined') return {};

  const response = await fetch(`${HOST}/user`, { credentials: 'include' });

  if (!response.ok) {
    return {};
  }

  return await response.json();
};

export const fetchLogin = async () => {
  if (typeof fetch === 'undefined') return {};

  const response = await fetch(`${HOST}/login`, { method: 'POST', credentials: 'include' });

  if (!response.ok) {
    return {};
  }

  return await fetchUserStatus();
};

export const fetchLogout = async () => {
  if (typeof fetch === 'undefined') return {};

  return await fetch(`${HOST}/logout`, { method: 'POST', credentials: 'include' });
};
