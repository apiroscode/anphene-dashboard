import React from "react";

import { PermissionEnum } from "@/config/enum";

import Attributes from "@/components/_icons/Attributes";
import Groups from "@/components/_icons/Groups";
import Navigation from "@/components/_icons/Navigation";
import Pages from "@/components/_icons/Pages";
import ProductTypes from "@/components/_icons/ProductTypes";
import StaffMembers from "@/components/_icons/StaffMembers";
import Suppliers from "@/components/_icons/Suppliers";
import SiteSettings from "@/components/_icons/SiteSettings";

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
  {
    description: "Store Page Settings",
    children: [
      {
        icon: <Navigation fontSize="inherit" viewBox="0 0 44 44" />,
        url: "navigations",
        label: "Navigation",
        description: "Define how users can navigate through your store",
        permission: PermissionEnum.MANAGE_MENUS,
      },
      {
        icon: <Pages fontSize="inherit" viewBox="0 0 44 44" />,
        url: "pages",
        label: "Pages",
        description: "Manage and add additional pages",
        permission: PermissionEnum.MANAGE_PAGES,
      },
      {
        icon: <SiteSettings fontSize="inherit" viewBox="0 0 44 44" />,
        url: "site-settings",
        label: "Site Settings",
        description: "View and update your site settings",
        permission: PermissionEnum.MANAGE_SETTINGS,
      },
    ],
  },
];
