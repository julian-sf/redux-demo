import React, { FunctionComponent, useState } from 'react';
import { createContext } from 'use-context-selector';

import { NormalizedEvents } from '../../api/events';

export const EventsContext = createContext<{ data?: NormalizedEvents; update(newEvent: NormalizedEvents): void }>({
  update() {},
});

export const EventsProvider: FunctionComponent = ({ children }) => {
  const [data, update] = useState<NormalizedEvents | undefined>(undefined);

  return <EventsContext.Provider value={{ data, update }}>{children}</EventsContext.Provider>;
};
