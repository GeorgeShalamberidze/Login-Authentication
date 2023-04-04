import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  mutation Login($loginInput: LoginInput) {
    login(loginInput: $loginInput) {
      id
      username
      refreshToken
      loginAttempt
    }
  }
`;

export default LOGIN_USER;
