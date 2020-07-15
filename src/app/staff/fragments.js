import gql from "graphql-tag";
import { GroupFragment } from "../groups/fragments";

export const StaffFragment = gql`
  fragment StaffFragment on User {
    id
    name
    email
    isActive
    groups {
      ...GroupFragment
    }
  }
  ${GroupFragment}
`;

export const StaffDetailsFragment = gql`
  fragment StaffDetailsFragment on User {
    id
    email
    isActive
    note
    name
    idCard
    dateJoined
    groups {
      ...GroupFragment
    }
  }
  ${GroupFragment}
`;
