import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { Events } from '../../shared/Events';
import { MemoizedEventsContext } from './MemoizedEventsContext';

export const MemoizedEventsContainer = () => {
  const events = useContextSelector(MemoizedEventsContext, value => value?.data);

  return <Events loadingEvents={!events} events={events} />;
};
