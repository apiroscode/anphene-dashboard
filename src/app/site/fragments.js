import gql from "graphql-tag";

import { AddressFragment } from "@/core/_graphql/fragments";

export const ShopFragment = gql`
  fragment ShopFragment on Shop {
    name
    headerText
    description
    defaultMailSenderName
    defaultMailSenderAddress
    customerSetPasswordUrl
    domain {
      host
    }
    companyAddress {
      ...AddressFragment
    }
    authorizationKeys {
      name
      key
    }
  }
  ${AddressFragment}
`;
