import React from 'react';

import { Events } from '../../shared/Events';
import { selectUserLoading } from '../../store/auth/selectors';
import { selectEvents, selectEventsLoading } from '../../store/events/selectors';
import { useSelector } from '../../store/utils';

export const EventsRedux = () => {
  const events = useSelector(selectEvents);
  const loadingEvents = useSelector(selectEventsLoading);
  const loadingUser = useSelector(selectUserLoading);

  return <Events events={events} loadingEvents={loadingEvents || loadingUser} />;
};
