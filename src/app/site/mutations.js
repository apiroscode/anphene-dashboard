import gql from "graphql-tag";

import { ErrorFragment } from "@/core/_graphql/fragments";

import { AddressFragment } from "@/core/_graphql/fragments";

import { ShopFragment } from "./fragments";

export const ShopSettingsUpdate = gql`
  mutation ShopSettingsUpdate(
    $shopDomainInput: SiteDomainInput!
    $shopSettingsInput: ShopSettingsInput!
    $addressInput: ShopAddressInput
  ) {
    shopSettingsUpdate(input: $shopSettingsInput) {
      errors {
        ...ErrorFragment
      }
      shop {
        ...ShopFragment
      }
    }
    shopDomainUpdate(input: $shopDomainInput) {
      errors {
        ...ErrorFragment
      }
      shop {
        domain {
          host
          url
        }
      }
    }
    shopAddressUpdate(input: $addressInput) {
      errors {
        ...ErrorFragment
      }
      shop {
        companyAddress {
          ...AddressFragment
        }
      }
    }
  }
  ${ErrorFragment}
  ${AddressFragment}
  ${ShopFragment}
`;

export const AddAuthorizationKey = gql`
  mutation AddAuthorizationKey($input: AuthorizationKeyInput!, $keyType: AuthorizationKeyType!) {
    authorizationKeyAdd(input: $input, keyType: $keyType) {
      errors {
        ...ErrorFragment
      }
      shop {
        ...ShopFragment
      }
    }
  }
  ${ErrorFragment}
  ${ShopFragment}
`;

export const DeleteAuthorizationKey = gql`
  mutation DeleteAuthorizationKey($keyType: AuthorizationKeyType!) {
    authorizationKeyDelete(keyType: $keyType) {
      errors {
        ...ErrorFragment
      }
      shop {
        ...ShopFragment
      }
    }
  }
  ${ErrorFragment}
  ${ShopFragment}
`;
