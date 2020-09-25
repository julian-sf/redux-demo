import { useEffect, useState } from 'react';

import { fetchEvents, NormalizedEvents } from '../api/events';
import { normalizeEventData } from '../store/events/slice';

const initialState: { loading: boolean; data?: NormalizedEvents } = { loading: false, data: undefined };

export const useFetchEventChain = ({ skip = false }: { skip?: boolean }) => {
  const [fetchOne, updateFetchOne] = useState(initialState);
  const [fetchTwo, updateFetchTwo] = useState(initialState);
  const [fetchThree, updateFetchThree] = useState(initialState);

  useEffect(() => {
    if (!skip && !fetchOne.data && !fetchOne.loading) {
      const fetch = async () => {
        return normalizeEventData(await fetchEvents());
      };

      updateFetchOne({ loading: true });
      fetch().then(data => updateFetchOne({ loading: false, data }));
    }
  }, [fetchOne.data, fetchOne.loading, skip]);

  useEffect(() => {
    if (!skip && fetchOne.data && !fetchTwo.data && !fetchTwo.loading) {
      const fetch = async () => {
        return normalizeEventData(await fetchEvents());
      };

      updateFetchTwo({ loading: true });
      fetch().then(data => updateFetchTwo({ loading: false, data }));
    }
  }, [fetchOne.data, fetchTwo.data, fetchTwo.loading, skip]);

  useEffect(() => {
    if (!skip && fetchOne.data && fetchTwo.data && !fetchThree.data && !fetchThree.loading) {
      const fetch = async () => {
        return normalizeEventData(await fetchEvents());
      };

      updateFetchThree({ loading: true });
      fetch().then(data => updateFetchThree({ loading: false, data }));
    }
  }, [fetchOne.data, fetchThree.data, fetchThree.loading, fetchTwo.data, skip]);

  return skip ? { loading: false } : fetchThree;
};
