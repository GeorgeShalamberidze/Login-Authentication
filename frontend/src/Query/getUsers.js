import { gql } from "@apollo/client";

const GET_USERS = gql`
  query GetAllUser {
    getAllUser {
      username
      id
      loginAttempt
    }
  }
`;

const GET_WELCOME_MESSAGE = gql`
  query {
    welcomeMessage
  }
`;

const USER_REGISTERED = gql`
  subscription {
    newUser {
      count
    }
  }
`;

export { GET_USERS, USER_REGISTERED, GET_WELCOME_MESSAGE };
