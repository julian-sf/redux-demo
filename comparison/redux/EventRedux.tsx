import React from 'react';

import { NormalizedEvent } from '../../api/events';
import { Event } from '../../shared/Event';
import { selectUserLoading } from '../../store/auth/selectors';
import { selectEventsLoading } from '../../store/events/selectors';
import { useSelector } from '../../store/utils';

export const EventRedux = ({ event }: { event: NormalizedEvent }) => {
  const eventsLoading = useSelector(selectEventsLoading);
  const userLoading = useSelector(selectUserLoading);

  return <Event event={event} eventsLoading={eventsLoading} userLoading={userLoading} />;
};
