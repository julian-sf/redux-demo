import React from 'react';

import { useEventsQuery } from '../api/events/useEventsQuery';
import { AuthButtonContainer } from '../shared/components/AuthButton/AuthButtonContainer';
import { Events } from '../shared/components/Events/Events';

const Index = () => {
  const { events, loading } = useEventsQuery();

  return (
    <>
      <h1>Event List</h1>
      <AuthButtonContainer />
      <Events loading={loading} events={events} />
    </>
  );
};

export default Index;
