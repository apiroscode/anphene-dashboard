import gql from "graphql-tag";
import { productImageFragment } from "@/graphql/fragments/productsImages";

export const CREATE_PRODUCT_IMAGE = gql`
  mutation CREATE_PRODUCT_IMAGE($input: ProductImageCreateInput!) {
    productImageCreate(input: $input) {
      product {
        id
        images {
          ...productImageFragment
        }
      }
    }
  }
  ${productImageFragment}
`;

export const DELETE_PRODUCT_IMAGE = gql`
  mutation DELETE_PRODUCT_IMAGE($id: ID!) {
    productImageDelete(id: $id) {
      product {
        id
        images {
          ...productImageFragment
        }
      }
    }
  }
  ${productImageFragment}
`;

export const REORDER_PRODUCT_IMAGE = gql`
  mutation REORDER_PRODUCT_IMAGE($imagesIds: [ID]!, $productId: ID!) {
    productImageReorder(imagesIds: $imagesIds, productId: $productId) {
      product {
        id
        images {
          ...productImageFragment
        }
      }
    }
  }
  ${productImageFragment}
`;
