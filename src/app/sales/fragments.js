import gql from "graphql-tag";

export const SaleTotalCountFragment = gql`
  fragment SaleTotalCountFragment on Sale {
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

export const SaleFragment = gql`
  fragment SaleFragment on Sale {
    id
    name
    startDate
    endDate
    value
    type
  }
`;

export const SaleDetailsFragment = gql`
  fragment SaleDetailsFragment on Sale {
    ...SaleFragment
    ...SaleTotalCountFragment
  }
  ${SaleFragment}
  ${SaleTotalCountFragment}
`;
