import { gql } from "@apollo/client";

const REGISTERED_USERS = gql`
  subscription {
    userRegistered {
      count
    }
  }
`;

export default REGISTERED_USERS;
