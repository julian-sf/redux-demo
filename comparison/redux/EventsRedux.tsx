import React from 'react';

import { Events } from '../../shared/Events';
import { selectEvents, selectEventsLoading } from '../../store/events/selectors';
import { useSelector } from '../../store/utils';

export const EventsRedux = () => {
  const events = useSelector(selectEvents);
  const loadingEvents = useSelector(selectEventsLoading);

  return <Events events={events} loadingEvents={loadingEvents} />;
};
