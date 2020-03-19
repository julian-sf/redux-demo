import { useQuery } from '@apollo/react-hooks';
import { useEffect } from 'react';

import { useAuthContext } from '../../contexts/AuthContext/useAuthContext';
import { EVENTS_QUERY } from './eventsQuery/eventsQuery';
import { EventsResponse } from './eventsQuery/eventsQuery.types';

export const useEventsQuery = () => {
  const { userInfo } = useAuthContext();
  const { data, refetch, loading } = useQuery<EventsResponse>(EVENTS_QUERY, { fetchPolicy: 'cache-first' });

  useEffect(() => {
    refetch();
  }, [userInfo.isLoggedIn, refetch]);

  return {
    loading,
    events: data ? data.events : [],
  };
};
