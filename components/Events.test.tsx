import React from 'react';

import { transformEventResponse } from '../api';
import { loadEvents } from '../server/data/events';
import { RootState } from '../store/config';
import { renderWithRedux } from '../utils/tests';
import { Events } from './Events';

jest.mock('../api/index', () => ({
  ...jest.requireActual('../api/index'),
  fetchEvents: jest.fn(),
}));

const apiMock = jest.requireMock('../api/index');
const results = transformEventResponse(loadEvents());

describe('Events component', () => {
  // This test can be more cleanly replaced with the following test:
  //   [store/events.test.tsx] events store > useEvents > fetches when store is not initialized
  it('fetches when store is not initialized', async () => {
    // setup mocks
    apiMock.fetchEvents.mockImplementationOnce(() => results);

    // dispatch actions
    const wrapper = renderWithRedux(<Events />);

    // make sure the mock was called
    expect(apiMock.fetchEvents).toHaveBeenCalled();

    // there should be 5 items on display with names...
    expect(await wrapper.findAllByText(/Name:/)).toHaveLength(5);

    // verify two of the links generated
    expect(await wrapper.findByText('Name: David Copperfield')).toHaveProperty(
      'href',
      'http://localhost/david-copperfield',
    );

    expect(await wrapper.findByText('Name: Entertainment')).toHaveProperty(
      'href',
      'http://localhost/mgm-resorts-entertainment',
    );
  });

  it('uses store when it is initialized', async () => {
    const wrapper = renderWithRedux(<Events />, {
      preloadedState: { events: { initialized: true, data: results, loading: false } } as RootState,
    });

    // there should be 5 items on display with names...
    expect(await wrapper.findAllByText(/Name:/)).toHaveLength(5);

    // verify two of the links generated
    expect(await wrapper.findByText('Name: David Copperfield')).toHaveProperty(
      'href',
      'http://localhost/david-copperfield',
    );

    expect(await wrapper.findByText('Name: Entertainment')).toHaveProperty(
      'href',
      'http://localhost/mgm-resorts-entertainment',
    );
  });
});
