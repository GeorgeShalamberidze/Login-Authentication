const bcrypt = require("bcryptjs");
const { generateRefreshToken } = require("../generateToken");
const uuid = require("uuid");
const {
  validateRegisterInputs,
  validateLoginInputs,
} = require("../utils/inputValidators");
const { UserInputError } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const users = [];

const resolvers = {
  Query: {
    getUser: (id) => {
      const foundUser = users.find((user) => user.id === id);
      return foundUser;
    },
    getAllUser: () => {
      return users;
    },
  },
  Mutation: {
    register: async (_, { registerInput }, context) => {
      const { username, password, confirmPassword } = registerInput;
      const { isValid, errors } = validateRegisterInputs(registerInput);
      const userInDB = users.find((user) => user.username === username);

      if (!isValid) throw new UserInputError("Errors", { errors });

      if (userInDB) {
        errors.general = "Username already exists";
        throw new UserInputError("Errors", { errors });
      }

      const hashedPass = await bcrypt.hash(password, 12);

      const id = uuid.v4();

      const refreshToken = generateRefreshToken(registerInput);

      const newUser = {
        id,
        password: hashedPass,
        username,
        createdAt: new Date().toISOString(),
        refreshToken,
        loginAttempt: 1,
      };

      users.push(newUser);

      pubsub.publish("USER_REGISTERED", {
        userRegistered: { count: users.length },
      });

      return newUser;
    },
    login: async (_, { loginInput }, context) => {
      const { username, password } = loginInput;
      const { isValid, errors } = validateLoginInputs(loginInput);
      const userInDB = users.find((user) => user.username === username);
      const id = uuid.v4();

      if (!isValid) throw new UserInputError("Errors", { errors });

      if (!userInDB) {
        errors.general = "User does not exist";
        throw new UserInputError("Errors", { errors });
      }

      const hashMatch = await bcrypt.compare(password, userInDB.password);

      if (!hashMatch) {
        errors.general = "Incorrect credentials";
        throw new UserInputError("Errors", { errors });
      }

      const refreshToken = generateRefreshToken(loginInput);

      userInDB.loginAttempt = userInDB.loginAttempt + 1;
      const newUser = {
        username,
        id,
        refreshToken,
        loginAttempt: userInDB?.loginAttempt,
      };

      pubsub.publish("USER_REGISTERED", {
        userRegistered: { count: users.length },
      });

      return newUser;
    },
  },
  Subscription: {
    userRegistered: {
      subscribe: () => pubsub.asyncIterator("USER_REGISTERED"),
      resolve: (payload) => {
        const count = payload.userRegistered.count;
        return { count };
      },
    },
  },
};

module.exports = resolvers;
