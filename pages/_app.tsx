import { ApolloProvider } from '@apollo/react-hooks';
import { AppProps } from 'next/app';
import React from 'react';

import { client } from '../api/client';
import { AuthContextProvider } from '../contexts/AuthContext/AuthContext';
import { RouterContextProvider } from '../next-utils/router';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <RouterContextProvider>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </RouterContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
