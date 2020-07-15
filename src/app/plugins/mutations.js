import gql from "graphql-tag";

import { ErrorFragment } from "@/core/_graphql/fragments";

import { PluginConfigurationFragment, PluginFragment } from "./fragments";

export const UpdatePlugin = gql`
  mutation UpdatePlugin($id: ID!, $input: PluginUpdateInput!) {
    pluginUpdate(id: $id, input: $input) {
      errors {
        ...ErrorFragment
      }
      plugin {
        ...PluginFragment
        configuration {
          ...PluginConfigurationFragment
        }
      }
    }
  }
  ${ErrorFragment}
  ${PluginFragment}
  ${PluginConfigurationFragment}
`;
