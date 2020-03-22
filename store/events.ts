import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { EventList, fetchEvents, NormalizedEvents } from '../api/events';
import { isEmptyObject } from '../utils/isEmptyObject';
import { updateLoggedInStatus } from './auth';
import { useSelector } from './useSelector';

interface EventSliceState {
  data: NormalizedEvents;
  loading: boolean;
  initialized: boolean;
}

export const initialEventsState: EventSliceState = { data: {}, loading: false, initialized: false };

export const normalizeEventData = (eventList: EventList): NormalizedEvents =>
  eventList.reduce((acc, event) => {
    acc[event.id] = event;

    return acc;
  }, {});

export const eventSlice = createSlice({
  name: 'event',
  initialState: initialEventsState,
  reducers: {
    fetchingEvents: state => {
      state.loading = true;
    },
    fetchedEvents: (state, action: PayloadAction<EventList>) => {
      state.loading = false;
      state.initialized = true;
      state.data = normalizeEventData(action.payload);
    },
  },
});

// dispatchable actions

export const getEvents = () => async dispatch => {
  dispatch(eventSlice.actions.fetchingEvents());
  const events = await fetchEvents();
  dispatch(eventSlice.actions.fetchedEvents(events));
};

// hooks

export const useEvents = (skip = false) => {
  const loading = useSelector(state => state.events.loading);
  const initialized = useSelector(state => state.events.initialized);
  const events = useSelector(state => state.events.data);
  const dispatch = useDispatch();

  if (skip) {
    return {
      loading: false,
      events: null,
      initialized,
    };
  }

  if (!loading && isEmptyObject(events)) {
    dispatch(getEvents());
    dispatch(updateLoggedInStatus());
  }

  return {
    loading,
    events,
    initialized,
  };
};
