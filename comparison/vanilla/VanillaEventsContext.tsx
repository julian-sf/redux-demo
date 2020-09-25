import React, { createContext, FunctionComponent, useCallback, useState } from 'react';

import { NormalizedEvents } from '../../api/events';

export const VanillaEventsContext = createContext<{
  data?: NormalizedEvents;
  update(newEvent: NormalizedEvents): void;
  shouldUpdate: boolean;
  setShouldUpdate(newValue: boolean): void;
}>({ update() {}, shouldUpdate: false, setShouldUpdate() {} });

export const VanillaEventsProvider: FunctionComponent = ({ children }) => {
  const [data, updateData] = useState<NormalizedEvents | undefined>(undefined);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const update = useCallback((data: NormalizedEvents) => {
    updateData(data);
    setShouldUpdate(false);
  }, []);

  return (
    <VanillaEventsContext.Provider value={{ data, update, shouldUpdate, setShouldUpdate }}>
      {children}
    </VanillaEventsContext.Provider>
  );
};
