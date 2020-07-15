import gql from "graphql-tag";
import { ErrorFragment } from "@/core/_graphql/fragments";
import { ProductImageFragment } from "./fragments";

export const CreateProductImage = gql`
  mutation CreateProductImage($input: ProductImageCreateInput!) {
    productImageCreate(input: $input) {
      errors {
        ...ErrorFragment
      }
      product {
        id
        images {
          ...ProductImageFragment
        }
      }
    }
  }
  ${ErrorFragment}
  ${ProductImageFragment}
`;

export const UpdateProductImage = gql`
  mutation UpdateProductImage($id: ID!, $alt: String) {
    productImageUpdate(id: $id, input: { alt: $alt }) {
      errors {
        ...ErrorFragment
      }
      image {
        ...ProductImageFragment
      }
    }
  }
  ${ErrorFragment}
  ${ProductImageFragment}
`;

export const DeleteProductImage = gql`
  mutation DeleteProductImage($id: ID!) {
    productImageDelete(id: $id) {
      errors {
        ...ErrorFragment
      }
      product {
        id
        images {
          ...ProductImageFragment
        }
      }
    }
  }
  ${ErrorFragment}
  ${ProductImageFragment}
`;

export const ReorderProductImage = gql`
  mutation ReorderProductImage($imagesIds: [ID]!, $productId: ID!) {
    productImageReorder(imagesIds: $imagesIds, productId: $productId) {
      product {
        id
        images {
          ...ProductImageFragment
        }
      }
    }
  }
  ${ProductImageFragment}
`;
