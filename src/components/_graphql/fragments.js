import gql from "graphql-tag";

export const ErrorFragment = gql`
  fragment ErrorFragment on Error {
    field
    message
  }
`;

export const PageInfoFragment = gql`
  fragment PageInfoFragment on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`;

export const sorterPagination = {
  type: (field) => `$first: Int
  $last: Int
  $after: String
  $before: String
  $sortDirection: OrderDirection!
  $sortField: ${field}!`,
  vars: `first: $first
    last: $last
    after: $after
    before: $before
    sortBy: { direction: $sortDirection, field: $sortField }`,
};
