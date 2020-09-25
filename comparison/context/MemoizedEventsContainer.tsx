import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { Events } from '../../shared/Events';
import { selectUserLoading } from '../../store/auth/selectors';
import { useSelector } from '../../store/utils';
import { MemoizedEventsContext } from './MemoizedEventsContext';

export const MemoizedEventsContainer = () => {
  const events = useContextSelector(MemoizedEventsContext, value => value?.data);
  const shouldUpdate = useContextSelector(MemoizedEventsContext, value => value.shouldUpdate);
  const userLoading = useSelector(selectUserLoading);

  return <Events loadingEvents={userLoading || !events || shouldUpdate} events={events} />;
};
