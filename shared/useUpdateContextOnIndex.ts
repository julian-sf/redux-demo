import { useEffect } from 'react';

import { NormalizedEvents } from '../api/events';
import { useFetchEventChain } from '../comparison/useFetchEvents';

export const useUpdateContextOnIndex = ({
  loading,
  update,
  shouldUpdate,
}: {
  loading: boolean;
  update(data: NormalizedEvents): void;
  shouldUpdate: boolean;
}) => {
  const { loading: fetchLoading, data } = useFetchEventChain({ skip: loading || !shouldUpdate });

  useEffect(() => {
    if (!fetchLoading && data && shouldUpdate) {
      update(data);
    }
  }, [data, fetchLoading, shouldUpdate, update]);
};
