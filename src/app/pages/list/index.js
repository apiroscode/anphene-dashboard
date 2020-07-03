import React from "react";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { useMutation } from "@/utils/hooks";

import { List } from "@/components/List";
import { StatusLabel } from "@/components/StatusLabel";

import { GetPages } from "../queries";
import { BulkDeletePage, BulkPublishPage } from "../mutations";

export default () => {
  const [bulkDelete, { loading: deleteLoading }] = useMutation(BulkDeletePage);
  const [bulkPublish, { loading: publishLoading }] = useMutation(BulkPublishPage);

  const props = {
    appName: "Page",
    query: GetPages,
    queryField: "pages",
    table: {
      defaultSort: {
        field: "TITLE",
        direction: "ASC",
      },
      column: [
        { label: "Title", field: "title", align: "left", sortField: "TITLE" },
        { label: "Slug", field: "slug", align: "left", sortField: "SLUG" },
        {
          label: "Visibility",
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
