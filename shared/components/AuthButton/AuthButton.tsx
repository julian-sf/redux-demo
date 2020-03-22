import React from 'react';

import { useRenderCount } from '../../../utils/useRenderCount';

type AuthButtonProps = {
  isLoggedIn: boolean;
  userName: string;
  login(): void;
  logout(): void;
};

export const AuthButton = ({ isLoggedIn, userName, login, logout }: AuthButtonProps) => {
  const renderCount = useRenderCount();

  return (
    <>
      <div>
        <div className={'button-container'}>
          <button type={'button'} onClick={() => (isLoggedIn ? logout() : login())}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
        <div className={'user'}>User: {userName ?? '<empty>'}</div>
        (simulated 250ms latency on all requests)
        {renderCount && `AuthButton render count: ${renderCount}`}
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
