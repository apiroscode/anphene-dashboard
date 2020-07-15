import gql from "graphql-tag";

import { ShopFragment } from "./fragments";

export const SiteSettings = gql`
  query SiteSettings {
    shop {
      ...ShopFragment
    }
  }
  ${ShopFragment}
`;
