import gql from "graphql-tag";
import { VoucherDetailsFragment, VoucherFragment } from "./fragments";
import { PageInfoFragment } from "@/core/_graphql/fragments";

export const GetVoucher = gql`
  query GetVoucher($id: ID!) {
    voucher(id: $id) {
      ...VoucherDetailsFragment
    }
  }
  ${VoucherDetailsFragment}
`;

export const GetVouchers = gql`
  query GetVouchers(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $sortBy: VoucherSortingInput
    $status: [DiscountStatusEnum]
    $timesUsed: IntRangeInput
    $discountType: [DiscountTypeEnum]
    $voucherType: [VoucherTypeEnum]
    $started: DateRangeInput
    $search: String
  ) {
    vouchers(
      first: $first
      last: $last
      after: $after
      before: $before
      sortBy: $sortBy
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
        ...PageInfoFragment
      }
      edges {
        node {
          ...VoucherFragment
        }
      }
    }
  }
  ${PageInfoFragment}
  ${VoucherFragment}
`;
