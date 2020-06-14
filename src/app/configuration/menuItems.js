import React from "react";

import { PermissionEnum } from "@/config/enum";
import StaffMembers from "@/components/icons/StaffMembers";
import Groups from "@/components/icons/Groups";
import Attributes from "@/components/icons/Attributes";
import ProductTypes from "@/components/icons/ProductTypes";
import Suppliers from "@/components/icons/Suppliers";

export const menuItems = [
  {
    description: "Attributes and Product Types",
    children: [
      {
        icon: <Attributes fontSize="inherit" viewBox="0 0 44 44" />,
        url: "attributes",
        label: "Attributes",
        description: "Determine attributes used to create product types",
        permission: PermissionEnum.MANAGE_ATTRIBUTES,
      },
      {
        icon: <ProductTypes fontSize="inherit" viewBox="0 0 44 44" />,
        url: "product-types",
        label: "Product Types",
        description: "Defines types of products you sell",
        permission: PermissionEnum.MANAGE_PRODUCT_TYPES,
      },
    ],
  },
  {
    description: "Product Settings",
    children: [
      {
        icon: <Suppliers fontSize="inherit" viewBox="0 0 1024 1024" />,
        url: "suppliers",
        label: "Suppliers",
        description: "Manage your product suppliers",
        permission: PermissionEnum.MANAGE_SUPPLIERS,
      },
    ],
  },
  {
    description: "Staff Settings",
    children: [
      {
        icon: <StaffMembers fontSize="inherit" viewBox="0 0 44 44" />,
        url: "staff",
        label: "Staff Members",
        description: "Manage your employee and their permissions",
        permission: PermissionEnum.MANAGE_STAFF,
      },
      {
        icon: <Groups fontSize="inherit" viewBox="0 0 44 44" />,
        url: "groups",
        label: "Groups",
        description: "Manage your groups and their permissions",
        permission: PermissionEnum.MANAGE_GROUPS,
      },
    ],
  },
];
