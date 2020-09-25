import { useEffect } from 'react';

import { NormalizedEvents } from '../api/events';

export const useUpdateContextOnIndex = ({
  loading,
  data,
  update,
}: {
  loading: boolean;
  data: NormalizedEvents;
  update(data: NormalizedEvents): void;
}) => {
  useEffect(() => {
    if (!loading && data) {
      update(data);
    }
  }, [data, loading, update]);
};
