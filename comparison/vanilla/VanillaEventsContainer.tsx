import React, { useContext } from 'react';

import { Events } from '../../shared/Events';
import { VanillaEventsContext } from './VanillaEventsContext';

export const VanillaEventsContainer = () => {
  const { data } = useContext(VanillaEventsContext);

  return <Events loadingEvents={!data} events={data} />;
};
