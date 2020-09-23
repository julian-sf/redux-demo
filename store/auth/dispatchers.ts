import { lazyDispatch } from '../utils';
import { authActions } from './actions';

export const useLogin = lazyDispatch(authActions.login);
export const useLogout = lazyDispatch(authActions.logout);
