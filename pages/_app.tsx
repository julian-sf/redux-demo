import { ApolloProvider } from '@apollo/react-hooks'
import { AppProps } from 'next/app'
import React from 'react'

import { client } from '../api/client'
import { AuthContextProvider } from '../contexts/AuthContext/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ApolloProvider>
  )
}

export default MyApp
