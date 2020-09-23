import { simpleSelector } from '../utils';

export const selectEvents = simpleSelector(state => state.event.data);
export const selectEventsLoading = simpleSelector(state => state.event.loading);
export const selectEventsInitialized = simpleSelector(state => state.event.initialized);
