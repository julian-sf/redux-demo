import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useRouter } from '../next-utils/router';
import { parseStringParam } from '../next-utils/urls';
import { withRedux } from '../next-utils/withRedux';
import { EventData } from '../server/data/events';
import { AuthButton } from '../shared/components/AuthButton/AuthButton';
import { Events } from '../shared/components/Events/Events';
import { useEvents } from '../store/events';

export default withRedux(() => {
  const { query, pushRoute, ready } = useRouter();
  const { initialized, events } = useEvents();
  const [displayedEvent, setDisplayedEvent] = useState<EventData | undefined>(undefined);

  const eventId = parseStringParam(query?.event);
  const eventData = events[eventId];

  useEffect(() => {
    if (!ready || !initialized) return;

    if (!eventData) pushRoute('/');

    setDisplayedEvent(eventData);
  }, [eventData, initialized, ready, pushRoute]);

  return (
    <>
      <h1>{displayedEvent?.name || 'Event List'}</h1>
      <AuthButton />
      <Link href={'/'}>
        <button>Back to index</button>
      </Link>
      <h2>Related Events</h2>
      <Events specificEventIds={displayedEvent?.relatedEvents} />
      <h2>Event Details</h2>
      <pre>{JSON.stringify(displayedEvent ?? {}, null, 2)}</pre>
    </>
  );
});
