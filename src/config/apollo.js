import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, from } from "apollo-link";
import { onError } from "apollo-link-error";
import { BatchHttpLink } from "apollo-link-batch-http";
import Cookies from "js-cookie";

import { API_URI } from "./constants";
import { store } from "./store";
import { createUploadLink } from "apollo-upload-client";

const cache = new InMemoryCache();

const errorLog = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.debug(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${JSON.stringify(path)}`
      )
    );
  }
  if (networkError && networkError.statusCode === 401) {
    store.getActions().user.logout();
  }
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  });

  return forward(operation);
});

const linkOptions = {
  credentials: "include",
  uri: `${API_URI}`,
};
const uploadLink = createUploadLink(linkOptions);

const batchLink = new BatchHttpLink({
  batchInterval: 100,
  ...linkOptions,
});

const link = ApolloLink.split(
  (operation) => operation.getContext().useBatching,
  batchLink,
  uploadLink
);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network",
  },
};

const client = new ApolloClient({
  link: from([errorLog, authMiddleware, link]),
  cache,
  defaultOptions,
});

export { client };
