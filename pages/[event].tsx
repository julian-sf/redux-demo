import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { EventType } from '../api/events/eventsQuery/eventsQuery.types';
import { useEventsQuery } from '../api/events/useEventsQuery';
import { useRouter } from '../next-utils/router';
import { parseStringParam } from '../next-utils/urls';
import { AuthButtonContainer } from '../shared/components/AuthButton/AuthButtonContainer';
import { Events } from '../shared/components/Events/Events';

const EventPage = ({
  events,
  displayedEvent,
  loading,
}: {
  events: EventType[];
  displayedEvent: EventType;
  loading: boolean;
}) => (
  <>
    <h1>{displayedEvent?.name || 'Event List'}</h1>
    <AuthButtonContainer />
    <Link href={'/'}>
      <button>Back to index</button>
    </Link>
    <h2>Related Events</h2>
    <Events loading={loading} events={events.filter(({ id }) => displayedEvent?.relatedEvents?.includes(id))} />
    <h2>Event Details</h2>
    <pre>{JSON.stringify(displayedEvent ?? {}, null, 2)}</pre>
  </>
);

const EventPageContainer = () => {
  const { query, push, ready } = useRouter();
  const { events, loading } = useEventsQuery();
  const [displayedEvent, setDisplayedEvent] = useState(undefined);

  useEffect(() => {
    if (!ready || loading) return;

    const eventId = parseStringParam(query?.event);
    const eventToDisplay = events.find(event => event.id === eventId);

    !eventToDisplay ? push('/') : setDisplayedEvent(eventToDisplay);
  }, [push, ready, events, loading, query]);

  return <EventPage events={events} loading={loading} displayedEvent={displayedEvent} />;
};

export default EventPageContainer;
