import gql from "graphql-tag";

export const SupplierFragment = gql`
  fragment SupplierFragment on Supplier {
    id
    name
    email
    phone
  }
`;

export const SupplierDetailFragment = gql`
  fragment SupplierDetailsFragment on Supplier {
    id
    name
    email
    phone
    address
  }
`;
