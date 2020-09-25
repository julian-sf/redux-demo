import { simpleSelector } from '../utils';

export const selectIsLoggedIn = simpleSelector(state => state.auth.isLoggedIn);
export const selectUserName = simpleSelector(state => state.auth.name);
export const selectUserLoading = simpleSelector(state => state.auth.loading);
