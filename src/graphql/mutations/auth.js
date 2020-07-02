import gql from "graphql-tag";
import { staffFragment } from "../fragments/staff";

export const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        ...staffFragment
      }
      errors {
        field
        message
      }
    }
  }
  ${staffFragment}
`;

export const LOGOUT = gql`
  mutation LOGOUT {
    logout {
      errors {
        field
        message
      }
    }
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation REQUEST_PASSWORD_RESET($email: String!, $redirectUrl: String!) {
    requestPasswordReset(email: $email, redirectUrl: $redirectUrl) {
      errors {
        field
        message
      }
    }
  }
`;

export const PASSWORD_RESET_CONFIRM = gql`
  mutation PASSWORD_RESET_CONFIRM($email: String!, $password: String!, $token: String!) {
    setPassword(email: $email, password: $password, token: $token) {
      errors {
        field
        message
      }
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation CHANGE_PASSWORD($newPassword: String!, $oldPassword: String!) {
    passwordChange(newPassword: $newPassword, oldPassword: $oldPassword) {
      errors {
        field
        message
      }
      user {
        id
        email
      }
    }
  }
`;
