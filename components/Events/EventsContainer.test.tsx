jest.mock('@apollo/react-hooks', () => ({
  useQuery: jest.fn(() => ({
    refetch: () => Promise.resolve({ data: { events: [] } }),
  })),
}));

import { useQuery } from '@apollo/react-hooks';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { AuthContextProvider } from '../../contexts/AuthContext/AuthContext';
import { useAuthContext } from '../../contexts/AuthContext/useAuthContext';
import { EventsContainer } from './EventsContainer';

// jest.mock('./Events', () => ({
//   Events: jest.fn(() => null),
// }));

const LoginButton = () => {
  const { setUserInfo } = useAuthContext();

  return (
    <button
      type={'button'}
      data-testid={'loginBtn'}
      onClick={() => setUserInfo({ isLoggedIn: true, name: 'userName' })}
    >
      Login
    </button>
  );
};

jest.useFakeTimers();

describe('EventsContainer', () => {
  it('tests', () => {
    const refetchMock = jest.fn(() => Promise.resolve({ data: { events: [] } }));

    (useQuery as any).mockImplementationOnce(() => ({
      refetch: refetchMock,
    }));

    const { debug, getByTestId, getAllByRole } = render(
      <AuthContextProvider>
        <LoginButton />
        <EventsContainer />
      </AuthContextProvider>,
    );

    debug();

    act(() => {
      jest.runAllTimers();
    });

    expect(refetchMock).toHaveBeenCalled();

    fireEvent.click(getAllByRole('button')[0]);

    expect(refetchMock).toHaveBeenCalledTimes(2);
  });
});
