import React, { createContext, FunctionComponent, useState } from 'react';

import { NormalizedEvents } from '../../api/events';

export const VanillaEventsContext = createContext<{
  data?: NormalizedEvents;
  update(newEvent: NormalizedEvents): void;
}>({ update() {} });

export const VanillaEventsProvider: FunctionComponent = ({ children }) => {
  const [data, update] = useState<NormalizedEvents | undefined>(undefined);

  return <VanillaEventsContext.Provider value={{ data, update }}>{children}</VanillaEventsContext.Provider>;
};
