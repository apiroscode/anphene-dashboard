import gql from "graphql-tag";
import { filterVariable, pageInfo } from "@/graphql/fragments/pageInfo";
import { saleFragment } from "@/graphql/fragments/sales";

export const GET_SALES = gql`
  query GET_SALES(
    ${filterVariable.type("SaleSortField")}
    $status: [DiscountStatusEnum]
    $saleType: DiscountTypeEnum
    $started: DateRangeInput
    $search: String
  ) {
    sales(
      ${filterVariable.vars}
      filter: { status: $status, saleType: $saleType, started: $started, search: $search }
    ) {
      pageInfo {
        ...pageInfo
      }
      edges {
        node {
          ...saleFragment
        }
      }
    }
  }
  ${pageInfo}
  ${saleFragment}
`;
