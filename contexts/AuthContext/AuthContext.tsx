import { useQuery } from '@apollo/react-hooks';
import React, { createContext, useState, useEffect } from 'react';

import { USER_STATUS_QUERY } from '../../api/queries';

export const AuthContext = createContext(undefined);

const INITIAL_STATE = {
  isLoggedIn: false,
  authInTransition: false,
  name: undefined,
};

export interface AuthContextValue {
  userInfo: typeof INITIAL_STATE;
  setUserInfo(info: typeof INITIAL_STATE): void;
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState(INITIAL_STATE);
  const shouldQueryUser = typeof document !== 'undefined' && document.cookie.includes('Auth=true') && !userInfo.name;
  const { loading, data } = useQuery(USER_STATUS_QUERY, { skip: !shouldQueryUser });

  useEffect(() => {
    if (!loading && data) {
      setUserInfo({ isLoggedIn: true, authInTransition: false, name: data.user.user });
    }
  }, [loading, data]);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
