import gql from "graphql-tag";
import { ErrorFragment } from "@/core/_graphql/fragments";

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
