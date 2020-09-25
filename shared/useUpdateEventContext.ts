import { useEffect } from 'react';

import { NormalizedEvents } from '../api/events';
import { useFetchEventChain } from '../comparison/useFetchEvents';

export const useUpdateEventContext = ({
  events,
  update,
}: {
  events?: NormalizedEvents;
  update(data: NormalizedEvents): void;
}) => {
  const result = useFetchEventChain({ skip: !!events && Object.keys(events).length > 0 });

  useEffect(() => {
    if (!result.loading && result.data && update) {
      update(result.data);
    }
  }, [result.data, result.loading, update]);
};
