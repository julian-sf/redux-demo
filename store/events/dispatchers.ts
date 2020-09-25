import { lazyDispatch } from '../utils';
import { eventActions } from './actions';

export const useFetchEvents = lazyDispatch(eventActions.fetch);
export const useSetEvents = lazyDispatch(eventActions.setEvents);
