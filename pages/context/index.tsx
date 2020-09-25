import React, { useEffect } from 'react';
import { useContextSelector } from 'use-context-selector';

import { EventsContainer } from '../../comparison/context/EventsContainer';
import { EventsContext } from '../../comparison/context/EventsContext';
import { useFetchEventChain } from '../../comparison/useFetchEvents';
import { Navigation } from '../../shared/Navigation';
import { useRenderCount } from '../../shared/useRenderCount';
import { selectUserLoading } from '../../store/auth/selectors';
import { useSelector } from '../../store/utils';

const ContextIndexPage = () => {
  const renderCount = useRenderCount();
  const userLoading = useSelector(selectUserLoading);
  const update = useContextSelector(EventsContext, value => value.update);
  const { loading, data } = useFetchEventChain(userLoading);

  useEffect(() => {
    if (!userLoading && !loading && data && update) {
      update(data);
    }
  }, [data, loading, update, userLoading]);

  return (
    <>
      <Navigation title={'Event List'} subtitle={'Context Example'} />
      <h3>Index Renders: {renderCount}</h3>
      <EventsContainer />
    </>
  );
};

export default ContextIndexPage;
