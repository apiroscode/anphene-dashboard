import gql from "graphql-tag";

import { staffFragment } from "../fragments/staff";

export const INITIALIZE = gql`
  query INITIALIZE {
    me {
      ...staffFragment
    }
  }
  ${staffFragment}
`;
