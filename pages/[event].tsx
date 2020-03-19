import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useEventsQuery } from '../api/useEventsQuery';
import { parseStringParam } from '../next-utils/urls';
import { useRouter } from '../next-utils/useRouter';
import { EventData } from '../server/data/events';
import { AuthButtonContainer } from '../shared/components/AuthButton/AuthButtonContainer';
import { Events } from '../shared/components/Events/Events';

const EventPage = ({ events, displayedEvent }: { events: EventData[]; displayedEvent: EventData }) => (
  <>
    <h1>{displayedEvent?.name || 'Event List'}</h1>
    <AuthButtonContainer />
    <Link href={'/'}>
      <button>Back to index</button>
    </Link>
    <h2>Related Events</h2>
    <Events events={events.filter(({ id }) => displayedEvent?.relatedEvents?.includes(id))} />
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

  return (
    <>
      <EventPage events={events} displayedEvent={displayedEvent} />
    </>
  );
};

export default EventPageContainer;
