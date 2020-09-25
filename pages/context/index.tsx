import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { EventsContainer } from '../../comparison/context/EventsContainer';
import { EventsContext } from '../../comparison/context/EventsContext';
import { useFetchEventChain } from '../../comparison/useFetchEvents';
import { Navigation } from '../../shared/Navigation';
import { useUpdateContextOnIndex } from '../../shared/useUpdateContextOnIndex';
import { selectUserLoading } from '../../store/auth/selectors';
import { useSelector } from '../../store/utils';

const ContextIndexPage = () => {
  const userLoading = useSelector(selectUserLoading);
  const update = useContextSelector(EventsContext, value => value.update);
  const { loading: fetchLoading, data } = useFetchEventChain({ skip: userLoading });

  useUpdateContextOnIndex({ loading: fetchLoading || userLoading, data, update });

  return (
    <>
      <Navigation title={'Event List'} subtitle={'Memoized Context Example'} />
      <EventsContainer />
    </>
  );
};

export default ContextIndexPage;
