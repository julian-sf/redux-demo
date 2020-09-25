import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { NormalizedEvent } from '../../api/events';
import { Event } from '../../shared/Event';
import { selectUserLoading } from '../../store/auth/selectors';
import { useSelector } from '../../store/utils';
import { EventsContext } from './EventsContext';

export const EventContext = ({ event }: { event: NormalizedEvent }) => {
  const events = useContextSelector(EventsContext, value => value?.data);
  const userLoading = useSelector(selectUserLoading);

  return <Event event={event} eventsLoading={!events} userLoading={userLoading} />;
};
