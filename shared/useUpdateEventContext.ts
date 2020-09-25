import { useEffect } from 'react';

import { useFetchEventChain } from '../comparison/useFetchEvents';

export const useUpdateEventContext = ({ events, update }) => {
  const result = useFetchEventChain(!!events && Object.keys(events).length > 0);

  useEffect(() => {
    if (!result.loading && result.data && update) {
      update(result.data);
    }
  }, [result.data, result.loading, update]);
};
