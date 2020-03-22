import { useQuery } from '@apollo/react-hooks';
import { useEffect, useRef } from 'react';

import { useAuthContext } from '../../contexts/AuthContext/useAuthContext';
import { EVENTS_QUERY } from './eventsQuery/eventsQuery';
import { EventsResponse } from './eventsQuery/eventsQuery.types';

export const useEventsQuery = () => {
  const { userInfo } = useAuthContext();
  const isMountedRef = useRef(false);

  const { data, refetch, loading } = useQuery<EventsResponse>(EVENTS_QUERY, { fetchPolicy: 'cache-first' });

  useEffect(() => {
    if (isMountedRef.current) {
      refetch();
    } else {
      isMountedRef.current = true;
    }
  }, [userInfo.isLoggedIn, refetch]);

  return {
    loading: loading || userInfo.authInTransition,
    events: data ? data.events : [],
  };
};
