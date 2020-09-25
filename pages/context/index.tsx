import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { MemoizedEventsContainer } from '../../comparison/context/MemoizedEventsContainer';
import { MemoizedEventsContext } from '../../comparison/context/MemoizedEventsContext';
import { Navigation } from '../../shared/Navigation';
import { useUpdateContextOnIndex } from '../../shared/useUpdateContextOnIndex';
import { selectUserLoading } from '../../store/auth/selectors';
import { useSelector } from '../../store/utils';

const MemoizedContextIndex = () => {
  const userLoading = useSelector(selectUserLoading);
  const update = useContextSelector(MemoizedEventsContext, value => value.update);

  useUpdateContextOnIndex({ loading: userLoading, update });

  return (
    <>
      <Navigation title={'Event List'} subtitle={'Memoized Context Example'} />
      <MemoizedEventsContainer />
    </>
  );
};

export default MemoizedContextIndex;
