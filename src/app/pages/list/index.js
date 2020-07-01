import React from "react";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { useMutation } from "@/utils/hooks";
import { GET_PAGES } from "@/graphql/queries/pages";
import { BULK_DELETE_PAGE, BULK_PUBLISH_PAGE } from "@/graphql/mutations/mutations";

import { List } from "@/components/Template";
import { StatusLabel } from "@/components/StatusLabel";

export default () => {
  const [bulkDelete, { loading: deleteLoading }] = useMutation(BULK_DELETE_PAGE);
  const [bulkPublish, { loading: publishLoading }] = useMutation(BULK_PUBLISH_PAGE);

  const props = {
    appName: "Page",
    query: GET_PAGES,
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
