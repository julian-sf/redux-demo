import React, { useContext } from 'react';

import { Events } from '../../shared/Events';
import { selectUserLoading } from '../../store/auth/selectors';
import { useSelector } from '../../store/utils';
import { VanillaEventsContext } from './VanillaEventsContext';

export const VanillaEventsContainer = () => {
  const { data, shouldUpdate } = useContext(VanillaEventsContext);
  const userLoading = useSelector(selectUserLoading);
  const loadingEvents = shouldUpdate || userLoading || !data;

  return <Events loadingEvents={loadingEvents} events={data} />;
};
