// This file needs to stay here because of next.js dir structure.
// Documentation: https://nextjs.org/docs#custom-app

import { AppProps } from 'next/app';
import React from 'react';

import { EventsProvider } from '../comparison/context/EventsContext';
import { RouterContextProvider } from '../next-utils/router';
import { wrapper } from '../store/wrapper';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RouterContextProvider>
      <EventsProvider>
        <Component {...pageProps} />
      </EventsProvider>
    </RouterContextProvider>
  );
};

export default wrapper.withRedux(App);
