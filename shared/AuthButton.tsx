import React, { useCallback } from 'react';
import { useContextSelector } from 'use-context-selector';

import { EventsContext } from '../comparison/context/EventsContext';
import { useRouter } from '../next-utils/router';
import { useLogin, useLogout } from '../store/auth/dispatchers';
import { selectIsLoggedIn, selectUserLoading, selectUserName } from '../store/auth/selectors';
import { useSelector } from '../store/utils';

export const AuthButton = () => {
  const { route } = useRouter();

  const login = useLogin();
  const logout = useLogout();

  const update = useContextSelector(EventsContext, value => value?.update);

  const userName = useSelector(selectUserName);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loading = useSelector(selectUserLoading);

  const wrappedLogout = useCallback(() => {
    if (route?.includes('context')) {
      update({});
    }

    logout({ fetch: !route?.includes('context') });
  }, [logout, route, update]);

  const wrappedLogin = useCallback(() => {
    if (route?.includes('context')) {
      update({});
    }

    login({ fetch: !route?.includes('context') });
  }, [login, route, update]);

  return (
    <>
      <div>
        <div className={'button-container'}>
          <button type={'button'} disabled={loading} onClick={() => (isLoggedIn ? wrappedLogout() : wrappedLogin())}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
        {<div className={'user'}>User: {userName ?? '<empty>'}</div>}
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
