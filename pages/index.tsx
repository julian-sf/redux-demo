import React, { useEffect } from 'react';

import { EventsRedux } from '../comparison/redux/EventsRedux';
import { Navigation } from '../shared/Navigation';
import { useRenderCount } from '../shared/useRenderCount';
import { useFetchEvents } from '../store/events/dispatchers';
import { selectEvents } from '../store/events/selectors';
import { useSelector } from '../store/utils';

const IndexPage = () => {
  const renderCount = useRenderCount();
  const fetchEvents = useFetchEvents();
  const events = useSelector(selectEvents);

  useEffect(() => {
    if (!events) {
      fetchEvents();
    }
  }, [events, fetchEvents]);

  return (
    <>
      <Navigation title={'Event List'} subtitle={'Redux Example'} />
      <h3>Index Renders: {renderCount}</h3>
      <EventsRedux />
    </>
  );
};

export default IndexPage;
