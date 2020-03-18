import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { useEventsQuery } from '../api/useEventsQuery';
import { parseStringParam } from '../next-utils/urls';
import { EventData } from '../server/data/events';
import { AuthButtonContainer } from '../shared/components/AuthButton/AuthButtonContainer';
import { Events } from '../shared/components/Events/Events';

const EventPage = ({ events, displayedEvent }: { events: EventData[]; displayedEvent: EventData }) => {
  return (
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
};

function useHasMounted() {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}

const EventPageContainer = () => {
  const hasMounted = useHasMounted();
  const { query, push } = useRouter();
  const { events } = useEventsQuery();

  const [displayedEvent, setDisplayedEvent] = useState<EventData>();

  const eventId = parseStringParam(query?.event);
  const eventData = events.find(event => event.id === eventId);

  useEffect(() => {
    if (!hasMounted) return;

    if (!eventData) push('/');

    setDisplayedEvent(eventData);
  }, [eventData, push, setDisplayedEvent, hasMounted]);

  return (
    <>
      <EventPage events={events} displayedEvent={displayedEvent} />
    </>
  );
};

export default EventPageContainer;
