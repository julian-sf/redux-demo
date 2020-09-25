// This file needs to stay here because of next.js dir structure.
// Documentation: https://nextjs.org/docs#custom-app

import whyDidYouRender from '@welldone-software/why-did-you-render';
import { AppProps } from 'next/app';
import React, { useEffect } from 'react';

import { EventsProvider } from '../comparison/context/EventsContext';
import { VanillaEventsProvider } from '../comparison/vanilla/VanillaEventsContext';
import { RouterContextProvider } from '../next-utils/router';
import { useLogin } from '../store/auth/dispatchers';
import { selectIsLoggedIn } from '../store/auth/selectors';
import { isAuthed } from '../store/auth/slice';
import { useFetchEvents } from '../store/events/dispatchers';
import { useSelector } from '../store/utils';
import { wrapper } from '../store/wrapper';

whyDidYouRender(React, {
  trackHooks: true,
  logOwnerReasons: true,
  logOnDifferentValues: true,
});

export default wrapper.withRedux(({ Component, pageProps }: AppProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const login = useLogin();
  const fetch = useFetchEvents();

  useEffect(() => {
    if (!isLoggedIn && isAuthed()) {
      login();
      if (window?.location.pathname.includes('redux')) fetch();
    }
  }, [fetch, isLoggedIn, login]);

  return (
    <RouterContextProvider>
      <EventsProvider>
        <VanillaEventsProvider>
          <Component {...pageProps} />
        </VanillaEventsProvider>
      </EventsProvider>
    </RouterContextProvider>
  );
});
