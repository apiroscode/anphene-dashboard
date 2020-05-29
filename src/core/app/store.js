import { action, actionOn, thunk } from "easy-peasy";

import { client } from "@/config/apollo";

import { LOGOUT } from "@/graphql/mutations/auth";

export const app = {
  loading: false,
  appActionRef: undefined,
  theme: localStorage.getItem("theme") || "light",
  setAppActionRef: action((state, payload) => {
    state.saveButtonRef = payload;
  }),
  toggleLoading: action((state, payload) => {
    state.loading = payload;
  }),
  updateTheme: action((state, payload) => {
    localStorage.setItem("theme", payload);
    state.theme = payload;
  }),
  resetTheme: actionOn(
    (actions, storeActions) => storeActions.auth.logout,
    (state) => {
      window.localStorage.setItem("theme", "light");
      state.theme = "light";
    }
  ),
};

export const auth = {
  user: undefined,
  update: action((state, payload) => {
    state.user = payload;
  }),
  logout: thunk(async (actions) => {
    await client.mutate({ mutation: LOGOUT });
    actions.update(undefined);
  }),
};
