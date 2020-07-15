import gql from "graphql-tag";

export const PluginFragment = gql`
  fragment PluginFragment on Plugin {
    id
    name
    description
    active
    type
  }
`;

export const PluginConfigurationFragment = gql`
  fragment PluginConfigurationFragment on ConfigurationItem {
    name
    value
    label
    helpText
  }
`;
