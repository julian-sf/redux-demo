import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchLogin, fetchLogout } from '../../api/auth';
import { eventActions } from '../events/actions';
import { RootState } from '../types';

export const authActions = {
  login: createAsyncThunk<
    { name: string },
    {
      fetch?: boolean;
    },
    { state: RootState }
  >('auth/login', async ({ fetch }, { dispatch }) => {
    const { user: name } = await fetchLogin();
    if (fetch) dispatch(eventActions.fetch());
    dispatch(authActions.updateLoginStatus());

    return { name };
  }),
  logout: createAsyncThunk<
    void,
    {
      fetch?: boolean;
    },
    { state: RootState }
  >('auth/logout', async ({ fetch }, { dispatch }) => {
    await fetchLogout();
    dispatch(authActions.updateLoginStatus());
    if (fetch) dispatch(eventActions.fetch());
  }),
  updateLoginStatus: createAction('auth/updateLoginStatus'),
};
