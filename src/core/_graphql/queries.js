import gql from "graphql-tag";

import { AuthLoginFragment } from "./fragments";

export const Initialize = gql`
  query Initialize {
    me {
      ...AuthLoginFragment
    }
  }
  ${AuthLoginFragment}
`;
