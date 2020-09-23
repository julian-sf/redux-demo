import { AuthSlice } from './auth/types';
import { EventSlice } from './events/types';

export type RootState = {
  auth: AuthSlice;
  event: EventSlice;
};
