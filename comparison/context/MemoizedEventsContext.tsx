import React, { FunctionComponent, useState } from 'react';
import { createContext } from 'use-context-selector';

import { NormalizedEvents } from '../../api/events';

export const MemoizedEventsContext = createContext<{
  data?: NormalizedEvents;
  update(newEvent: NormalizedEvents): void;
}>({
  update() {},
});

export const MemoizedEventsProvider: FunctionComponent = ({ children }) => {
  const [data, update] = useState<NormalizedEvents | undefined>(undefined);

  return <MemoizedEventsContext.Provider value={{ data, update }}>{children}</MemoizedEventsContext.Provider>;
};
