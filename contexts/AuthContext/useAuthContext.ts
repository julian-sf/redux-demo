import { useContext } from 'react';

import { AuthContext, AuthContextValue } from './AuthContext';

export const useAuthContext = () => {
  return useContext<AuthContextValue>(AuthContext);
};
