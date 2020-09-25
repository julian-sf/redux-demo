import React, { useEffect } from 'react';

import { useRouter } from '../../next-utils/router';
import { parseStringParam } from '../../next-utils/urls';
import { EventDetailPage } from '../../shared/EventDetailPage';
import { useFetchEvents } from '../../store/events/dispatchers';
import { selectEvents } from '../../store/events/selectors';
import { useSelector } from '../../store/utils';

const EventPage = () => {
  const fetchEvents = useFetchEvents();
  const { query, pushRoute } = useRouter();

  const events = useSelector(selectEvents);

  const eventId = parseStringParam(query?.event);
  const eventData = events?.[eventId];

  useEffect(() => {
    if (!events) {
      fetchEvents();
    }

    if (events && !eventData) {
      pushRoute('/');
    }
  }, [eventData, events, fetchEvents, pushRoute]);

  return <EventDetailPage events={events} eventData={eventData} />;
};

export default EventPage;
