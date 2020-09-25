import React, { FunctionComponent, useState } from 'react';
import { createContext } from 'use-context-selector';

import { NormalizedEvents } from '../../api/events';

export const EventsContext = createContext<{ data?: NormalizedEvents; update(newEvent: NormalizedEvents): void }>(
  undefined,
);

export const EventsProvider: FunctionComponent = ({ children }) => {
  const [state, setState] = useState<NormalizedEvents | undefined>(undefined);

  return <EventsContext.Provider value={{ data: state, update: setState }}>{children}</EventsContext.Provider>;
};
