import { useQuery } from '@apollo/react-hooks';
import { useEffect } from 'react';

import { useAuthContext } from '../contexts/AuthContext/useAuthContext';

import { EventsResponse, EVENTS_QUERY } from '.';

export const useEventsQuery = () => {
  const { userInfo } = useAuthContext();
  const { data, refetch } = useQuery<EventsResponse>(EVENTS_QUERY, { fetchPolicy: 'cache-first' });

  useEffect(() => {
    refetch();
  }, [userInfo.isLoggedIn, refetch]);

  return {
    events: data ? data.events : [],
  };
};
