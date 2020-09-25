import React, { FunctionComponent, useCallback, useState } from 'react';
import { createContext } from 'use-context-selector';

import { NormalizedEvents } from '../../api/events';

export const MemoizedEventsContext = createContext<{
  data?: NormalizedEvents;
  update(newEvent: NormalizedEvents): void;
  shouldUpdate: boolean;
  setShouldUpdate(newValue: boolean): void;
}>({
  update() {},
  shouldUpdate: false,
  setShouldUpdate() {},
});

export const MemoizedEventsProvider: FunctionComponent = ({ children }) => {
  const [data, updateData] = useState<NormalizedEvents | undefined>(undefined);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const update = useCallback((data: NormalizedEvents) => {
    updateData(data);
    setShouldUpdate(false);
  }, []);

  return (
    <MemoizedEventsContext.Provider value={{ data, update, shouldUpdate, setShouldUpdate }}>
      {children}
    </MemoizedEventsContext.Provider>
  );
};
