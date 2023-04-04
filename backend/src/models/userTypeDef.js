const { gql } = require("apollo-server-express");

const userTypeDef = gql`
  type User {
    id: ID!
    username: String!
    refreshToken: String!
    createdAt: String!
    loginAttempt: Int!
  }

  type Query {
    getAllUser: [User!]!
    getUser: User!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type Mutation {
    login(loginInput: LoginInput): User!
    register(registerInput: RegisterInput): User!
  }

  type UserCount {
    count: Int!
  }

  type Subscription {
    userRegistered: UserCount!
  }
`;

module.exports = userTypeDef;
