import React from "react";

import { StoreProvider } from "easy-peasy";
import { BrowserRouter } from "react-router-dom";

import { ApolloProvider } from "@apollo/react-hooks";

import "@/config/dayjs";
import { client } from "@/config/apollo";
import { store } from "@/config/store";

import { ScrollToTop } from "./components/ScrollToTop";
import { App } from "./app";

export default () => (
  <ApolloProvider client={client}>
    <StoreProvider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </StoreProvider>
  </ApolloProvider>
);
