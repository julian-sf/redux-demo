import React, { useCallback, useContext } from 'react';
import { useContextSelector } from 'use-context-selector';

import { EventsContext } from '../comparison/context/EventsContext';
import { VanillaEventsContext } from '../comparison/vanilla/VanillaEventsContext';
import { useRouter } from '../next-utils/router';
import { useLogin, useLogout } from '../store/auth/dispatchers';
import { selectIsLoggedIn, selectUserLoading, selectUserName } from '../store/auth/selectors';
import { useFetchEvents } from '../store/events/dispatchers';
import { useSelector } from '../store/utils';

export const AuthButton = () => {
  const { route } = useRouter();

  const login = useLogin();
  const logout = useLogout();
  const fetch = useFetchEvents();

  const update = useContextSelector(EventsContext, value => value?.update);
  const { update: vanillaUpdate } = useContext(VanillaEventsContext);

  const userName = useSelector(selectUserName);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loading = useSelector(selectUserLoading);

  const clearContexts = useCallback(() => {
    if (route?.includes('context')) {
      update({});
    }

    if (route?.includes('vanilla')) {
      vanillaUpdate({});
    }
  }, [route, update, vanillaUpdate]);

  const wrappedLogout = useCallback(() => {
    clearContexts();
    logout();
    if (!route?.includes('context')) fetch();
  }, [clearContexts, fetch, logout, route]);

  const wrappedLogin = useCallback(() => {
    clearContexts();
    login();
    if (!route?.includes('context')) fetch();
  }, [clearContexts, fetch, login, route]);

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
