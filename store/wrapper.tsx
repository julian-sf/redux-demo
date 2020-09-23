import { createWrapper, MakeStore } from 'next-redux-wrapper';

import { initializeStore } from './initializeStore';
import { RootState } from './types';

let reduxStore: ReturnType<typeof initializeStore>;

function getOrInitializeStore(initialState?: RootState): typeof reduxStore {
  // Always make a new store if server, otherwise state is shared between requests
  if (typeof window === 'undefined') {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!reduxStore) {
    reduxStore = initializeStore(initialState);
  }

  return reduxStore;
}

// create a makeStore function
const makeStore: MakeStore<RootState> = () => getOrInitializeStore();

// export an assembled wrapper
export const wrapper = createWrapper<RootState>(makeStore);
