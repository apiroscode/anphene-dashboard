import gql from "graphql-tag";

export const pageInfo = gql`
  fragment PageInfo on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`;

export const filterVariable = {
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
