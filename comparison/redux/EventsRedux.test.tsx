import React from 'react';

import { mockUseRouter } from '../../next-utils/mockUseRouter';
import { loadEvents } from '../../server/data/events';
import { renderWithRedux } from '../../shared/tests';
import { normalizeEventData } from '../../store/events/slice';
import { initialRootState } from '../../store/initializeStore';
import { RootState } from '../../store/types';
import { EventsRedux } from './EventsRedux';

mockUseRouter({ pathname: '/redux' });

const data = normalizeEventData(loadEvents());

describe('Events component', () => {
  // This test can be more cleanly replaced with the following test:
  //   [store/events.test.tsx] events store > useEvents > fetches when store is not initialized
  it('fetches when store is not initialized', async () => {
    // dispatch actions
    const wrapper = renderWithRedux(<EventsRedux />, {
      preloadedState: { ...initialRootState, event: { data, loading: false } },
    });

    // there should be 5 items on display with names...
    expect(await wrapper.findAllByText(/Name:/)).toHaveLength(5);

    // verify two of the links generated
    expect(await wrapper.findByText('Name: David Copperfield')).toHaveProperty(
      'href',
      'http://localhost/redux/david-copperfield',
    );

    expect(await wrapper.findByText('Name: Entertainment')).toHaveProperty(
      'href',
      'http://localhost/redux/mgm-resorts-entertainment',
    );
  });

  it('uses store when it is initialized', async () => {
    const wrapper = renderWithRedux(<EventsRedux />, {
      preloadedState: {
        ...initialRootState,
        event: { data, loading: false },
      } as RootState,
    });

    // there should be 5 items on display with names...
    expect(await wrapper.findAllByText(/Name:/)).toHaveLength(5);

    // verify two of the links generated
    expect(await wrapper.findByText('Name: David Copperfield')).toHaveProperty(
      'href',
      'http://localhost/redux/david-copperfield',
    );

    expect(await wrapper.findByText('Name: Entertainment')).toHaveProperty(
      'href',
      'http://localhost/redux/mgm-resorts-entertainment',
    );
  });
});
