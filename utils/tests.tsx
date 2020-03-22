import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import { initializeStore } from '../store/config';

export function renderWithRedux(
  ui,
  { preloadedState, store = initializeStore(preloadedState) } = { preloadedState: undefined },
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}
