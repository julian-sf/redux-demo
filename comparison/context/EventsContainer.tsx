import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { Events, EventsProps } from '../../shared/Events';
import { EventsContext } from './EventsContext';

export const EventsContainer = ({ specificEventIds }: { specificEventIds?: EventsProps['specificEventIds'] }) => {
  const events = useContextSelector(EventsContext, value => value?.data);

  return <Events specificEventIds={specificEventIds} events={events} />;
};
