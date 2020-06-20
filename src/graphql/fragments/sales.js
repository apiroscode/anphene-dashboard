import gql from "graphql-tag";

export const saleFragment = gql`
  fragment saleFragment on Sale {
    id
    name
    startDate
    endDate
    value
  }
`;
