import gql from 'graphql-tag';

import { EventData } from '../server/data/events';

export type Event = EventData;

export type EventsResponse = {
  events: Event[];
};

export const EVENTS_QUERY = gql`
  query events {
    events @rest(type: "events", path: "events") {
      id
      name
      propertyId
      relatedEvents
    }
  }
`;

export const USER_STATUS_QUERY = gql`
  query user {
    user @rest(type: "user", path: "user") {
      user
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login {
    login(input: {}) @rest(type: "login", path: "login", method: "POST") {
      user
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout(input: {}) @rest(type: "logout", path: "logout", method: "POST") {
      name
    }
  }
`;
