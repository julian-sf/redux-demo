import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchLogin, fetchLogout } from '../../api/auth';

export const authActions = {
  login: createAsyncThunk('auth/login', async () => {
    const { user: name } = await fetchLogin();

    return { name };
  }),
  logout: createAsyncThunk('auth/logout', async () => {
    await fetchLogout();
  }),
};
