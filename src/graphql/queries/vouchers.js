import gql from "graphql-tag";
import { filterVariable, pageInfo } from "@/graphql/fragments/pageInfo";
import { voucherDetailFragment, voucherFragment } from "@/graphql/fragments/vouchers";

export const GET_VOUCHERS = gql`
  query GET_VOUCHERS(
    ${filterVariable.type("VoucherSortField")}
    $status: [DiscountStatusEnum]
    $timesUsed: IntRangeInput
    $discountType: [DiscountTypeEnum]
    $voucherType: [VoucherTypeEnum]
    $started: DateRangeInput
    $search: String
  ) {
    vouchers(
      ${filterVariable.vars}
      filter: {
        status: $status
        timesUsed: $timesUsed
        discountType: $discountType
        voucherType: $voucherType
        started: $started
        search: $search
      }
    ) {
      pageInfo {
        ...pageInfo
      }
      edges {
        node {
          ...voucherFragment
        }
      }
    }
  }
  ${pageInfo}
  ${voucherFragment}
`;

export const GET_VOUCHER = gql`
  query GET_VOUCHER($id: ID!) {
    voucher(id: $id) {
      ...voucherDetailFragment
    }
  }
  ${voucherDetailFragment}
`;
