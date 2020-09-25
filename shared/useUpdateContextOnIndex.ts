import { useEffect } from 'react';

import { NormalizedEvents } from '../api/events';
import { useFetchEventChain } from '../comparison/useFetchEvents';

export const useUpdateContextOnIndex = ({
  loading,
  update,
}: {
  loading: boolean;
  update(data: NormalizedEvents): void;
}) => {
  const { loading: fetchLoading, data } = useFetchEventChain({ skip: loading });

  useEffect(() => {
    if (!fetchLoading && data) {
      update(data);
    }
  }, [data, fetchLoading, update]);
};
