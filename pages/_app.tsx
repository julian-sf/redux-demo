import { AppProps } from 'next/app';
import React from 'react';

import { RouterContextProvider } from '../next-utils/router';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RouterContextProvider>
      <Component {...pageProps} />
    </RouterContextProvider>
  );
}

export default MyApp;
