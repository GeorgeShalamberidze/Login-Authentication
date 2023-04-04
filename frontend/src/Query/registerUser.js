import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation Register($registerInput: RegisterInput) {
    register(registerInput: $registerInput) {
      id
      username
      refreshToken
      createdAt
      loginAttempt
    }
  }
`;

export default REGISTER_USER;
