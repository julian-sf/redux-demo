import gql from 'graphql-tag'

import { EventData } from '../server/data/events'

export interface Events {
  [id: string]: EventData
}

export const EVENTS_QUERY = gql`
  query events {
    events @rest(type: "events", path: "events") {
      name
      propertyId
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation login {
    login(input: {}) @rest(type: "login", path: "login", method: "POST") {
      user
    }
  }
`

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout(input: {}) @rest(type: "logout", path: "logout", method: "POST") {
      name
    }
  }
`
