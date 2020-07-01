import gql from "graphql-tag";

export const voucherTotalCountFragment = gql`
  fragment voucherTotalCountFragment on Voucher {
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

export const voucherFragment = gql`
  fragment voucherFragment on Voucher {
    id
    code
    minSpentAmount
    startDate
    endDate
    discountValue
    usageLimit
  }
`;

export const voucherDetailFragment = gql`
  fragment voucherDetailFragment on Voucher {
    ...voucherFragment
    ...voucherTotalCountFragment
    used
    type
    applyOncePerOrder
    applyOncePerCustomer
    discountType
    minCheckoutItemsQuantity
  }
  ${voucherFragment}
  ${voucherTotalCountFragment}
`;
