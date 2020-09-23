import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchLogin, fetchLogout } from '../../api/auth';
import { Router } from '../../next-utils/router';
import { eventActions } from '../events/actions';

export const authActions = {
  login: createAsyncThunk('auth/login', async (_, { dispatch }) => {
    const { user: name } = await fetchLogin();
    dispatch(eventActions.fetch());

    return { name };
  }),
  logout: createAsyncThunk('auth/logout', async (_, { dispatch }) => {
    await fetchLogout();
    dispatch(eventActions.fetch());
    Router.pushRoute('/');
  }),
};
