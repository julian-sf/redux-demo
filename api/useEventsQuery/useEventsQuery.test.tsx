import { MockedProvider } from '@apollo/react-testing';
import { renderHook, act } from '@testing-library/react-hooks';
import React from 'react';
import wait from 'waait';

import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { useEventsQuery } from './useEventsQuery';

import { EVENTS_QUERY } from '..';

describe('EventsContainer', () => {
  it('tests', async () => {
    const userInfo = { isLoggedIn: false, name: undefined };

    const mocks = [
      {
        request: {
          query: EVENTS_QUERY,
        },
        result: () => ({
          data: { events: [{ name: 'test', id: 'test', propertyId: 'test', relatedEvents: ['12'] }] },
        }),
      },
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthContext.Provider value={{ userInfo }}>{children}</AuthContext.Provider>
      </MockedProvider>
    );

    const { result, rerender } = renderHook(() => useEventsQuery(), { wrapper });

    expect(result.current.loading).toBeTruthy();

    await act(async () => {
      await wait(0);
    });

    rerender();

    expect(result.current.events.length).toBe(1);
  });
});
