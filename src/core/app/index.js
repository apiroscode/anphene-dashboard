import React, { useEffect, useReducer } from "react";

import { useStoreActions, useStoreState } from "easy-peasy";
import Cookies from "js-cookie";
import { SnackbarProvider } from "notistack";

import { useApolloClient } from "@apollo/react-hooks";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { INIT_URI } from "@/config/constants";
import { theme as mainTheme } from "@/config/theme";

import { INITIALIZE } from "@/graphql/queries/initialize";
import { LOGOUT } from "@/graphql/mutations/auth";

import { Baseline } from "./components/Baseline";
import { Error } from "./components/Error";
import { Loading } from "../components/Loading";
import { Routes } from "../routes";

const initialState = {
  loading: true,
  error: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "TOGGLE_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const App = () => {
  const client = useApolloClient();
  const updateAuth = useStoreActions((actions) => actions.auth.update);
  const appTheme = useStoreState((state) => state.app.theme);
  const setAppTheme = useStoreActions((actions) => actions.app.updateTheme);
  const [state, dispatch] = useReducer(reducer, initialState);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        ...mainTheme(appTheme),
      }),
    [appTheme]
  );

  useEffect(() => {
    const initialize = async () => {
      try {
        const csrftoken = Cookies.get("csrftoken");
        if (csrftoken === undefined) {
          await fetch(INIT_URI, { credentials: "include" });
        }

        const {
          data: { me },
        } = await client.query({ query: INITIALIZE });

        if (me) {
          const { isStaff } = me;
          if (isStaff) {
            updateAuth(me);
          } else {
            await client.mutate({ mutation: LOGOUT });
            setAppTheme("light");
          }
        } else {
          setAppTheme("light");
        }
      } catch (e) {
        dispatch({ type: "TOGGLE_ERROR", payload: true });
      }
      dispatch({ type: "TOGGLE_LOADING", payload: false });
    };

    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let child;
  if (state.error) {
    child = <Error />;
  } else if (state.loading) {
    child = <Loading />;
  } else {
    child = <Routes />;
  }
  return (
    <ThemeProvider theme={theme}>
      <Baseline />
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={2000}
        preventDuplicate
      >
        {child}
      </SnackbarProvider>
    </ThemeProvider>
  );
};
