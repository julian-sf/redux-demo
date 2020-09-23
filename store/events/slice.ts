import { createSlice } from '@reduxjs/toolkit';

import { EventList } from '../../api/events';
import { eventActions } from './actions';
import { EventSlice } from './types';

export const initialEventsState: EventSlice = { data: {}, loading: false, initialized: false };

export const normalizeEventData = (eventList: EventList): EventSlice['data'] =>
  eventList.reduce((acc, event) => {
    acc[event.id] = event;

    return acc;
  }, {});

export const eventSlice = createSlice({
  name: 'event',
  initialState: initialEventsState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(eventActions.fetch.pending, slice => {
        slice.loading = true;
      })
      .addCase(eventActions.fetch.fulfilled, (slice, action) => {
        slice.loading = false;
        slice.initialized = true;
        slice.data = normalizeEventData(action.payload);
      }),
});
