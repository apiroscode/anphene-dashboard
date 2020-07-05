import React from "react";

import {
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  RemoveCircle as RemoveCircleIcon,
} from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";

import { List } from "@/components/List";
import { FilterRadioBox } from "@/components/ListFilters";
import { StatusLabel } from "@/components/StatusLabel";

import { GetCollections } from "../queries";
import { BulkDeleteCollection, BulkPublishCollection } from "../mutations";
import { green, red } from "@material-ui/core/colors";

export default () => {
  const [bulkDelete, { loading: deleteLoading }] = useMutation(BulkDeleteCollection);
  const [bulkPublish, { loading: publishLoading }] = useMutation(BulkPublishCollection);

  const props = {
    appName: "Collection",
    query: GetCollections,
    queryField: "collections",
    filters: [
      {
        component: <FilterRadioBox />,
        field: "published",
        label: "Status",
        defaultValue: "PUBLISHED",
        items: [
          {
            label: "Published",
            value: "PUBLISHED",
          },
          {
            label: "Hidden",
            value: "HIDDEN",
          },
        ],
      },
    ],
    table: {
      defaultSort: {
        field: "NAME",
        direction: "ASC",
      },
      column: [
        {
          label: "Collection Name",
          field: "name",
          align: "left",
          sortField: "NAME",
        },
        {
          label: "Products",
          field: "products.totalCount",
          align: "center",
          sortField: "PRODUCT_COUNT",
        },
        {
          label: "Availability",
          field: "isPublished",
          align: "left",
          render: (isPublished) => (
            <StatusLabel
              status={isPublished ? "success" : "error"}
              label={isPublished ? "Published" : "Not published"}
            />
          ),
        },
        {
          label: "Feature On Homepage",
          field: "featureOnHomepage",
          align: "center",
          render: (value) =>
            value ? (
              <CheckCircleIcon style={{ color: green[500] }} />
            ) : (
              <RemoveCircleIcon style={{ color: red[500] }} />
            ),
        },
      ],
    },
    bulkLoading: deleteLoading || publishLoading,
    bulkMutations: [
      {
        mutation: bulkPublish,
        type: "text",
        label: "unpublish",
        vars: {
          isPublished: false,
        },
      },
      {
        mutation: bulkPublish,
        type: "text",
        label: "publish",
        vars: {
          isPublished: true,
        },
      },
      {
        mutation: bulkDelete,
        type: "icon",
        icon: <DeleteIcon />,
        label: "delete",
      },
    ],
  };

  return <List {...props} />;
};
