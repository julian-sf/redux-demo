import React, { useContext } from 'react';

import { VanillaEventsContext } from '../../comparison/vanilla/VanillaEventsContext';
import { useRouter } from '../../next-utils/router';
import { parseStringParam } from '../../next-utils/urls';
import { EventDetailPage } from '../../shared/EventDetailPage';
import { useUpdateEventContext } from '../../shared/useUpdateEventContext';

const ContextEventPage = () => {
  const { query } = useRouter();
  const { data: events, update } = useContext(VanillaEventsContext);

  useUpdateEventContext({ events, update });

  const eventId = parseStringParam(query?.event);
  const eventData = events?.[eventId];

  return <EventDetailPage events={events} eventData={eventData} />;
};

export default ContextEventPage;
