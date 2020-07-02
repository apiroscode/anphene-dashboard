import gql from "graphql-tag";

export const supplierFragment = gql`
  fragment supplierFragment on Supplier {
    id
    name
    email
    phone
  }
`;

export const supplierDetailFragment = gql`
  fragment supplierDetailFragment on Supplier {
    ...supplierFragment
    address
  }
  ${supplierFragment}
`;
