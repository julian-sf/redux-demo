import React from 'react';

import { useEventsQuery } from '../api/events/useEventsQuery';
import { AuthButtonContainer } from '../shared/components/AuthButton/AuthButtonContainer';
import { Events } from '../shared/components/Events/Events';

const Index = () => {
  const { events } = useEventsQuery();

  return (
    <>
      <h1>Event List</h1>
      <AuthButtonContainer />
      <Events events={events} />
    </>
  );
};

export default Index;
