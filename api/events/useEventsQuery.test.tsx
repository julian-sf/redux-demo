jest.mock('@apollo/react-hooks', () => ({
  useQuery: jest.fn(() => ({
    data: { events: [{ name: 'test', id: 'test', propertyId: 'test', relatedEvents: ['12'] }] },
    loading: false,
    refetch: () => {},
  })),
}));

import * as ApolloMock from '@apollo/react-hooks';
import { renderHook, act } from '@testing-library/react-hooks';
import React, { useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { useEventsQuery } from './useEventsQuery';

describe('EventsContainer', () => {
  it('returns events when loaded', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={{ userInfo: { isLoggedIn: false, name: undefined } }}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useEventsQuery(), { wrapper });

    expect(result.current.events.length).toBe(1);
  });

  it('fetches events again on user login', () => {
    let setUserInfoRef = undefined;

    const AuthProvider = ({ children }: { children: React.ReactNode }) => {
      const [userInfo, setUserInfo] = useState({ userInfo: { isLoggedIn: false, name: undefined } });
      setUserInfoRef = setUserInfo;

      return <AuthContext.Provider value={{ userInfo, setUserInfo }}>{children}</AuthContext.Provider>;
    };

    const { result } = renderHook(() => useEventsQuery(), { wrapper: AuthProvider });

    expect(result.current.loading).toBeFalsy();
    expect(result.current.events).toHaveLength(1);

    const refetchRef = jest.fn();

    (ApolloMock.useQuery as any).mockImplementationOnce(() => ({
      data: { events: [] },
      loading: false,
      refetch: refetchRef,
    }));

    act(() => {
      setUserInfoRef({ isLoggedIn: true, name: 'test' });
    });

    expect(refetchRef).toBeCalledTimes(1);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.events).toHaveLength(0);
  });
});
