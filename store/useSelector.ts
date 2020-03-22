import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';

import { RootState } from './config';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
