import { action, actionOn, thunk } from "easy-peasy";

import { client } from "@/config/apollo";

import { Logout } from "@/app/users/mutations";

export const app = {
  loading: false,
  appActionRef: undefined,
  headerBackLabel: undefined,
  theme: localStorage.getItem("theme") || "light",
  setAppActionRef: action((state, payload) => {
    state.saveButtonRef = payload;
  }),
  toggleLoading: action((state, payload) => {
    state.loading = payload;
  }),
  setHeaderBackLabel: action((state, payload) => {
    state.headerBackLabel = payload;
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
    await client.mutate({ mutation: Logout });
    actions.update(undefined);
  }),
};
