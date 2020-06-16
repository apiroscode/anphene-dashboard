import React from "react";

import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";

import { GET_COLLECTIONS } from "@/graphql/queries/collections";
import { BULK_DELETE_COLLECTION } from "@/graphql/mutations/collections";

import { StatusLabel } from "@/components/StatusLabel";
import { FilterRadioBox } from "@/components/Template/List/Filters";
import { List } from "@/components/Template";

export default () => {
  const [bulkDelete, { loading: deleteLoading }] = useMutation(BULK_DELETE_COLLECTION);
  const [bulkPublish, { loading: publishLoading }] = useMutation(BULK_DELETE_COLLECTION);

  const props = {
    appName: "Collection",
    query: GET_COLLECTIONS,
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
