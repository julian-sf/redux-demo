import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { RestLink } from 'apollo-link-rest'
import { AppProps } from 'next/app'
import fetch from 'node-fetch'
import React from 'react'

const globalVar = global as any
globalVar.fetch = fetch
globalVar.Headers = fetch.Headers

import { AuthContextProvider } from '../contexts/AuthContext/AuthContext'

const HOST = 'http://localhost:3333/'
const restLink: any[] = [new RestLink({ uri: HOST, credentials: 'include' })]

export const client = new ApolloClient({
  link: ApolloLink.from(restLink),
  cache: new InMemoryCache(),
})

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
