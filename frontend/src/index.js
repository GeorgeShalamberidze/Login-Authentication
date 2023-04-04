import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import jwtDecode from "jwt-decode";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { StateContext } from "./context/ContextProvider";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql",
  })
);
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const token = localStorage.getItem("token");
if (token) {
  const decodedRefreshToken = jwtDecode(token);

  if (decodedRefreshToken * 1000 < Date.now()) {
    localStorage.removeItem("token");
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={apolloClient}>
    <StateContext>
      <BrowserRouter>
        <React.StrictMode>
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="*" element={<App />} />
          </Routes>
        </React.StrictMode>
      </BrowserRouter>
    </StateContext>
  </ApolloProvider>
);
