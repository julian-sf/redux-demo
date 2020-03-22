import React from 'react';

import { useEventsQuery } from '../api/events/useEventsQuery';
import { AuthButtonContainer } from '../shared/components/AuthButton/AuthButtonContainer';
import { Events } from '../shared/components/Events/Events';
import { useRenderCount } from '../utils/useRenderCount';

const Index = () => {
  const { events, loading } = useEventsQuery();
  const renderCount = useRenderCount();

  return (
    <>
      <h1>Event List</h1>
      {renderCount && <pre>Index render count: {renderCount}</pre>}
      <AuthButtonContainer />
      <Events loading={loading} events={events} />
    </>
  );
};

export default Index;
