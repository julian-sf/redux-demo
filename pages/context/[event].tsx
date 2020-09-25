import React, { useEffect } from 'react';
import { useContextSelector } from 'use-context-selector';

import { EventsContext } from '../../comparison/context/EventsContext';
import { useFetchEventChain } from '../../comparison/useFetchEvents';
import { useRouter } from '../../next-utils/router';
import { parseStringParam } from '../../next-utils/urls';
import { EventDetailPage } from '../../shared/EventDetailPage';

const ContextEventPage = () => {
  const { query } = useRouter();

  const events = useContextSelector(EventsContext, value => value?.data);
  const update = useContextSelector(EventsContext, value => value?.update);

  const result = useFetchEventChain(!!events && Object.keys(events).length > 0);

  const eventId = parseStringParam(query?.event);
  const eventData = events?.[eventId];

  useEffect(() => {
    if (!result.loading && result.data && update) {
      update(result.data);
    }
  }, [result.data, result.loading, update]);

  return <EventDetailPage eventData={eventData} />;
};

export default ContextEventPage;
