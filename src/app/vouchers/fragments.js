import gql from "graphql-tag";

export const VoucherTotalCountFragment = gql`
  fragment VoucherTotalCountFragment on Voucher {
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

export const VoucherFragment = gql`
  fragment VoucherFragment on Voucher {
    id
    code
    minSpentAmount
    startDate
    endDate
    discountValue
    usageLimit
  }
`;

export const VoucherDetailsFragment = gql`
  fragment VoucherDetailsFragment on Voucher {
    ...VoucherFragment
    ...VoucherTotalCountFragment
    used
    type
    applyOncePerOrder
    applyOncePerCustomer
    discountType
    minCheckoutItemsQuantity
  }
  ${VoucherFragment}
  ${VoucherTotalCountFragment}
`;
