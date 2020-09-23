import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchEvents } from '../../api/events';

export const eventActions = {
  fetch: createAsyncThunk('event/fetch', async () => {
    return await fetchEvents();
  }),
};
