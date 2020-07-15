import gql from "graphql-tag";

export const SimpleSuppliersFragment = gql`
  fragment SimpleSuppliersFragment on Query {
    suppliers(first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

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
