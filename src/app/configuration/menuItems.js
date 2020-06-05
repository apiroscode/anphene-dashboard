import React from "react";

import { PermissionEnum } from "@/config/enum";
import StaffMembers from "@/components/icons/StaffMembers";
import PermissionGroups from "@/components/icons/PermissionGroups";
import Attributes from "@/components/icons/Attributes";
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
        icon: <PermissionGroups fontSize="inherit" viewBox="0 0 44 44" />,
        url: "permission-groups",
        label: "Permission Groups",
        description: "Manage your permission groups and their permissions",
        permission: PermissionEnum.MANAGE_GROUPS,
      },
    ],
  },
];
