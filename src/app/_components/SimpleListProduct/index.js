import React from "react";

import { useNavigate } from "react-router-dom";

import { PermissionEnum } from "@/config/enum";
import { usePermissions } from "@/utils/hooks";

import { AvatarThumb } from "@/components/AvatarThumb";
import { StatusLabel } from "@/components/StatusLabel";
import { Card } from "@/components/Card";
import { SimpleList } from "@/components/SimpleList";

import { GetProducts } from "../../products/queries";

export const SimpleListProduct = (props) => {
  const {
    title,
    action = null,
    bulkMutations = [],
    bulkLoading = false,
    vars,
    setListProps,
  } = props;
  const [gotPermission] = usePermissions(PermissionEnum.MANAGE_PRODUCTS);

  const navigate = useNavigate();

  const listProps = {
    placeholder: "Products",
    query: GetProducts,
    queryField: "products",
    vars: vars,
    table: {
      action: (node) => (gotPermission ? navigate(`/products/${node.id}`) : undefined),
      defaultSort: {
        field: "NAME",
        direction: "ASC",
      },
      column: [
        {
          label: "",
          field: "thumbnail",
          align: "center",
          width: 32,
          render: (value) => <AvatarThumb thumbnail={value?.url} />,
        },
        {
          label: "Name",
          field: "name",
          align: "left",
          sortField: "NAME",
        },
        {
          label: "Type",
          field: "productType.name",
          align: "left",
        },
        {
          label: "Published",
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
          label: "Price",
          field: "pricing.priceRange.start",
          align: "right",
          sortField: "PRICE",
          render: (price) => `Rp ${price.toLocaleString()}`,
        },
      ],
    },
    bulkLoading,
    bulkMutations,
    setListProps,
  };

  return (
    <Card title={title} action={action} useDense>
      <SimpleList {...listProps} />
    </Card>
  );
};
