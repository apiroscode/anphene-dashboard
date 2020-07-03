import gql from "graphql-tag";
import { SaleDetailsFragment, SaleFragment } from "./fragments";
import { PageInfoFragment } from "@/core/_graphql/fragments";

export const GetSale = gql`
  query GetSale($id: ID!) {
    sale(id: $id) {
      ...SaleDetailsFragment
    }
  }
  ${SaleDetailsFragment}
`;

export const GetSales = gql`
  query GetSales(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $sortBy: SaleSortingInput
    $status: [DiscountStatusEnum]
    $saleType: DiscountTypeEnum
    $started: DateRangeInput
    $search: String
  ) {
    sales(
      first: $first
      last: $last
      after: $after
      before: $before
      sortBy: $sortBy
      filter: { status: $status, saleType: $saleType, started: $started, search: $search }
    ) {
      pageInfo {
        ...PageInfoFragment
      }
      edges {
        node {
          ...SaleFragment
        }
      }
    }
  }
  ${PageInfoFragment}
  ${SaleFragment}
`;
