require("dotenv").config();
const typeDefs = require("./src/models/userTypeDef");
const resolvers = require("./src/graphql/resolvers");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
const httpServer = http.createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
const serverCleanup = useServer({ schema }, wsServer);
const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(port, () => {
    console.log(
      `Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
}
startServer();
