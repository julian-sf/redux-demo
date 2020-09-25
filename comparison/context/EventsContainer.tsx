import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { Events } from '../../shared/Events';
import { EventsContext } from './EventsContext';

export const EventsContainer = ({ specificEventIds }: { specificEventIds?: string[] }) => {
  const events = useContextSelector(EventsContext, value => value?.data);

  return <Events specificEventIds={specificEventIds} events={events} />;
};
