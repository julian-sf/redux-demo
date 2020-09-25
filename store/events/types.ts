import { NormalizedEvents } from '../../api/events';

export type EventSlice = {
  data?: NormalizedEvents;
  loading: boolean;
};
