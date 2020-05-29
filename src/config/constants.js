export const DELAYED_TIMEOUT = 300;

const BASE_URI =
  process.env.NODE_ENV === "development"
    ? `http://${window.location.hostname}:8000`
    : window.location.origin;
export const INIT_URI = `${BASE_URI}/init/`;
export const API_URI = `${BASE_URI}/graphql/`;

const CLIENT_URI =
  process.env.NODE_ENV === "development"
    ? `http://${window.location.hostname}:3000`
    : window.location.origin;

export const CONFIRM_PASSWORD_URI = `${CLIENT_URI}/user/reset-password-confirm`;
