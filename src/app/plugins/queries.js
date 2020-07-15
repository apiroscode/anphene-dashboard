import gql from "graphql-tag";

import { PluginConfigurationFragment, PluginFragment } from "./fragments";

export const GetPlugins = gql`
  query GetPlugins($active: Boolean) {
    plugins(first: 100, filter: { active: $active }) {
      edges {
        node {
          ...PluginFragment
        }
      }
    }
  }
  ${PluginFragment}
`;

export const GetPlugin = gql`
  query GetPlugin($id: ID!) {
    plugin(id: $id) {
      ...PluginFragment
      configuration {
        ...PluginConfigurationFragment
      }
    }
  }
  ${PluginFragment}
  ${PluginConfigurationFragment}
`;
