import React from 'react';

import { useLogin, useLogout } from '../../../store/auth/dispatchers';
import { selectIsLoggedIn, selectUserName } from '../../../store/auth/selectors';
import { useSelector } from '../../../store/utils';

export const AuthButton = () => {
  const login = useLogin();
  const logout = useLogout();
  const userName = useSelector(selectUserName);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <div>
        <div className={'button-container'}>
          <button type={'button'} onClick={() => (isLoggedIn ? logout() : login())}>
            {isLoggedIn === 'unknown' ? 'Login' : isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
        {isLoggedIn !== 'unknown' && <div className={'user'}>User: {userName ?? '<empty>'}</div>}
        (simulated 500ms latency on all requests)
      </div>
      <style jsx>{`
        div {
          display: flex;
          width: 740px;
        }
        .button-container {
          width: 150px;
        }

        .user {
          flex: 1;
        }
      `}</style>
    </>
  );
};
