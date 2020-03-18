import React from 'react';

import { useEventsQuery } from '../../api/useEventsQuery';
import { Events } from './Events';

export const EventsContainer = () => {
  const { events } = useEventsQuery();

  return <Events events={events} />;
};
