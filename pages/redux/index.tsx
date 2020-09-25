import React, { useEffect } from 'react';

import { EventsRedux } from '../../comparison/redux/EventsRedux';
import { Navigation } from '../../shared/Navigation';
import { selectUserLoading } from '../../store/auth/selectors';
import { isAuthed } from '../../store/auth/slice';
import { useFetchEvents } from '../../store/events/dispatchers';
import { selectEvents } from '../../store/events/selectors';
import { useSelector } from '../../store/utils';

const IndexPage = () => {
  const fetchEvents = useFetchEvents();
  const events = useSelector(selectEvents);
  const userLoading = useSelector(selectUserLoading);

  useEffect(() => {
    if (!events && !userLoading) {
      if (isAuthed()) return;
      fetchEvents();
    }
  }, [events, fetchEvents, userLoading]);

  return (
    <>
      <Navigation title={'Event List'} subtitle={'Redux Example'} />
      <EventsRedux />
    </>
  );
};

export default IndexPage;
