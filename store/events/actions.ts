import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchEvents } from '../../api/events';
import { EventSlice } from './types';

export const eventActions = {
  fetch: createAsyncThunk('event/fetch', async () => {
    await fetchEvents();
    await fetchEvents();

    return await fetchEvents();
  }),
  setEvents: createAction<EventSlice['data']>('event/setEvents'),
};
