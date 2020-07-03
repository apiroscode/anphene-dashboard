import gql from "graphql-tag";

import { AuthLoginFragment, ErrorFragment } from "@/core/_graphql/fragments";

export const Login = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      errors {
        ...ErrorFragment
      }
      user {
        ...AuthLoginFragment
      }
    }
  }
  ${ErrorFragment}
  ${AuthLoginFragment}
`;

export const Logout = gql`
  mutation Logout {
    logout {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const RequestPasswordReset = gql`
  mutation RequestPasswordReset($email: String!, $redirectUrl: String!) {
    requestPasswordReset(email: $email, redirectUrl: $redirectUrl) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const PasswordResetConfirm = gql`
  mutation PasswordResetConfirm($email: String!, $password: String!, $token: String!) {
    setPassword(email: $email, password: $password, token: $token) {
      errors {
        ...ErrorFragment
      }
    }
  }
  ${ErrorFragment}
`;

export const ChangePassword = gql`
  mutation ChangePassword($newPassword: String!, $oldPassword: String!) {
    passwordChange(newPassword: $newPassword, oldPassword: $oldPassword) {
      errors {
        ...ErrorFragment
      }
      user {
        id
        email
      }
    }
  }
  ${ErrorFragment}
`;
