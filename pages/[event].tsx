import Link from 'next/link';
import React, { useEffect } from 'react';

import { useRouter } from '../next-utils/router';
import { parseStringParam } from '../next-utils/urls';
import { AuthButton } from '../shared/components/AuthButton/AuthButton';
import { Events } from '../shared/components/Events/Events';
import { selectEvents, selectEventsInitialized } from '../store/events/selectors';
import { useSelector } from '../store/utils';

const EventPage = () => {
  const { query, pushRoute, ready } = useRouter();

  const initialized = useSelector(selectEventsInitialized);
  const events = useSelector(selectEvents);

  const eventId = parseStringParam(query?.event);
  const eventData = events[eventId];

  useEffect(() => {
    if (!ready || !initialized) return;

    if (!eventData) pushRoute('/');
  }, [eventData, initialized, ready, pushRoute]);

  return (
    <>
      <h1>{eventData?.name || 'Event List'}</h1>
      <AuthButton />
      <Link href={'/'}>
        <button>Back to index</button>
      </Link>
      <h2>Related Events</h2>
      <Events specificEventIds={eventData?.relatedEvents} />
      <h2>Event Details</h2>
      <pre>{JSON.stringify(eventData ?? {}, null, 2)}</pre>
    </>
  );
};

export default EventPage;
