import { PermissionEnum } from "@/config/enum";

import homeIcon from "./assets/menu-home-icon.svg";
import catalogIcon from "./assets/menu-catalog-icon.svg";
import customerIcon from "./assets/menu-customers-icon.svg";
import discountIcon from "./assets/menu-discounts-icon.svg";

export const menuItems = [
  {
    label: "Home",
    url: "/",
    icon: homeIcon,
  },
  {
    label: "Catalog",
    icon: catalogIcon,
    children: [
      {
        label: "Products",
        url: "/products",
        permission: PermissionEnum.MANAGE_PRODUCTS,
      },
      {
        label: "Categories",
        url: "/categories",
        permission: PermissionEnum.MANAGE_CATEGORIES,
      },
      {
        label: "Collections",
        url: "/collections",
        permission: PermissionEnum.MANAGE_COLLECTIONS,
      },
    ],
  },
  {
    label: "Customers",
    icon: customerIcon,
    url: "/customers",
    permission: PermissionEnum.MANAGE_CUSTOMERS,
  },
  {
    label: "Discounts",
    icon: discountIcon,
    children: [
      {
        label: "Sales",
        url: "/sales",
        permission: PermissionEnum.MANAGE_DISCOUNTS,
      },
      {
        label: "Vouchers",
        url: "/vouchers",
        permission: PermissionEnum.MANAGE_DISCOUNTS,
      },
    ],
  },
];
