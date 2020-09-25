import { useEffect } from 'react';

import { selectUserLoading } from '../store/auth/selectors';
import { isAuthed } from '../store/auth/slice';
import { useFetchEvents } from '../store/events/dispatchers';
import { selectEvents } from '../store/events/selectors';
import { useSelector } from '../store/utils';

export const useUpdateReduxOnIndex = () => {
  const fetchEvents = useFetchEvents();
  const events = useSelector(selectEvents);
  const userLoading = useSelector(selectUserLoading);

  useEffect(() => {
    if (!events && !userLoading) {
      if (isAuthed()) return;
      fetchEvents();
    }
  }, [events, fetchEvents, userLoading]);
};
