import React from 'react';

import { useAuth, useUserName } from '../../../store/auth';

export const AuthButton = () => {
  const { loggedIn, login, logout } = useAuth();
  const userName = useUserName();

  return (
    <>
      <div>
        <div className={'button-container'}>
          <button type={'button'} onClick={() => (loggedIn ? logout() : login())}>
            {loggedIn === 'unknown' ? 'Login' : loggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
        {loggedIn !== 'unknown' && <div className={'user'}>User: {userName ?? '<empty>'}</div>}
        (simulated 250ms latency on all requests)
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
