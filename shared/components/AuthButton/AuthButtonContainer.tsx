import { useMutation } from '@apollo/react-hooks';
import React from 'react';

import { LOGIN_MUTATION, LOGOUT_MUTATION } from '../../../api/queries';
import { useAuthContext } from '../../../contexts/AuthContext/useAuthContext';
import { AuthButton } from './AuthButton';

export const AuthButtonContainer = () => {
  const { userInfo, setUserInfo } = useAuthContext();
  const { isLoggedIn, name } = userInfo;

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login: { user } }) => setUserInfo({ isLoggedIn: true, name: user, authInTransition: false }),
  });

  const [logout] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => setUserInfo({ isLoggedIn: false, name: undefined, authInTransition: false }),
  });

  const setAuthTransitioning = (action: () => void) => {
    setUserInfo({ ...userInfo, authInTransition: true });
    action();
  };

  return (
    <AuthButton
      isLoggedIn={isLoggedIn}
      userName={name}
      login={() => setAuthTransitioning(login)}
      logout={() => setAuthTransitioning(logout)}
    />
  );
};
