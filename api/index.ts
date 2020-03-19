import gql from 'graphql-tag';

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
