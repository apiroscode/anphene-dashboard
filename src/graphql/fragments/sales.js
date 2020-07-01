import gql from "graphql-tag";

export const saleTotalCountFragment = gql`
  fragment saleTotalCountFragment on Sale {
    id
    categories {
      totalCount
    }
    products {
      totalCount
    }
    collections {
      totalCount
    }
  }
`;

export const saleFragment = gql`
  fragment saleFragment on Sale {
    id
    name
    startDate
    endDate
    value
    type
    ...saleTotalCountFragment
  }
  ${saleTotalCountFragment}
`;
