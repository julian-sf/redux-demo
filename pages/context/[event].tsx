import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { MemoizedEventsContext } from '../../comparison/context/MemoizedEventsContext';
import { useRouter } from '../../next-utils/router';
import { parseStringParam } from '../../next-utils/urls';
import { EventDetailPage } from '../../shared/EventDetailPage';
import { useUpdateEventContext } from '../../shared/useUpdateEventContext';

const ContextEventPage = () => {
  const { query } = useRouter();

  const events = useContextSelector(MemoizedEventsContext, value => value.data);
  const update = useContextSelector(MemoizedEventsContext, value => value.update);

  useUpdateEventContext({ events, update });

  const eventId = parseStringParam(query?.event);
  const eventData = events?.[eventId];

  return <EventDetailPage events={events} eventData={eventData} />;
};

export default ContextEventPage;
