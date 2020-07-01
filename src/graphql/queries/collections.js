import gql from "graphql-tag";
import { filterVariable, pageInfo } from "@/graphql/fragments/pageInfo";
import { collectionDetailFragment, collectionFragment } from "@/graphql/fragments/collections";

export const GET_COLLECTIONS = gql`
  query GET_COLLECTIONS(
    ${filterVariable.type("CollectionSortField")}
    $search: String
    $published: CollectionPublished

  ) {
    collections(
      ${filterVariable.vars}, 
      filter: { search: $search, published: $published}
    ) {
      pageInfo {
        ...pageInfo
      }
      edges {
        node {
          ...collectionFragment
          products {
            totalCount
          }
        }
      }
    }
  }
  ${pageInfo}
  ${collectionFragment}  
`;

export const GET_COLLECTION = gql`
  query GET_COLLECTION($id: ID!) {
    collection(id: $id) {
      ...collectionDetailFragment
    }
  }
  ${collectionDetailFragment}
`;

export const GET_SIMPLE_COLLECTIONS = gql`
  query GET_SIMPLE_COLLECTIONS(
    ${filterVariable.type("CollectionSortField")}
    $search: String
    $sales: [ID]
    $notInSales: [ID]
    $vouchers: [ID]
    $notInVouchers: [ID]
  ) {
    collections(
      ${filterVariable.vars}, 
      filter: {
        search: $search
        sales: $sales
        notInSales: $notInSales
        vouchers: $vouchers
        notInVouchers: $notInVouchers
      }
    ) {
      pageInfo {
        ...pageInfo
      }
      edges {
        node {
          id
          name
          products {
            totalCount
          }
        }
      }
    }
  }
  ${pageInfo}
`;
