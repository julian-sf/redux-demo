import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { RestLink } from 'apollo-link-rest'
import fetch from 'node-fetch'

const globalVar = global as any
globalVar.fetch = fetch
globalVar.Headers = fetch.Headers

const HOST = 'http://localhost:3333/'
const restLink: any[] = [new RestLink({ uri: HOST, credentials: 'include' })]

export const client = new ApolloClient({
  link: ApolloLink.from(restLink),
  cache: new InMemoryCache(),
})
