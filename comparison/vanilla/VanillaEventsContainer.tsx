import React, { useContext } from 'react';

import { Events } from '../../shared/Events';
import { VanillaEventsContext } from './VanillaEventsContext';

export const VanillaEventsContainer = ({ specificEventIds }: { specificEventIds?: string[] }) => {
  const { data } = useContext(VanillaEventsContext);

  return <Events specificEventIds={specificEventIds} events={data} />;
};
