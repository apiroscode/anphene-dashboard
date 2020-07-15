import React, { lazy, Suspense } from "react";

import { Navigate, Routes as ReactRoutes } from "react-router-dom";

import { PermissionEnum } from "@/config/enum";

import { Route } from "./components/Route";
import { Loading } from "./components/Loading";

const LayoutUser = lazy(() => import("./layoutUser"));
const LayoutDashboard = lazy(() => import("./layoutDashboard"));
const Exception = lazy(() => import("./components/Exception"));

const Login = lazy(() => import("@/app/users/Login"));
const ResetPassword = lazy(() => import("@/app/users/ResetPassword"));
const ResetPasswordConfirm = lazy(() => import("@/app/users/ResetPasswordConfirm"));

const AttributeList = lazy(() => import("@/app/attributes/list"));
const AttributeCreate = lazy(() => import("@/app/attributes/create"));
const AttributeUpdate = lazy(() => import("@/app/attributes/update"));

const CategoryList = lazy(() => import("@/app/categories/list"));
const CategoryCreate = lazy(() => import("@/app/categories/create"));
const CategoryUpdate = lazy(() => import("@/app/categories/update"));

const CollectionList = lazy(() => import("@/app/collections/list"));
const CollectionCreate = lazy(() => import("@/app/collections/create"));
const CollectionUpdate = lazy(() => import("@/app/collections/update"));

const Configuration = lazy(() => import("@/app/configuration"));

const CustomerList = lazy(() => import("@/app/customers/list"));
const CustomerCreate = lazy(() => import("@/app/customers/create"));
const CustomerUpdate = lazy(() => import("@/app/customers/update"));

const CustomerAddressesList = lazy(() => import("@/app/customersAddresses/list"));

const GroupList = lazy(() => import("@/app/groups/list"));
const GroupCreate = lazy(() => import("@/app/groups/create"));
const GroupUpdate = lazy(() => import("@/app/groups/update"));

const NavigationList = lazy(() => import("@/app/navigations/list"));
const NavigationUpdate = lazy(() => import("@/app/navigations/update"));

const StaffList = lazy(() => import("@/app/staff/list"));
const StaffCreate = lazy(() => import("@/app/staff/create"));
const StaffUpdate = lazy(() => import("@/app/staff/update"));

const PageList = lazy(() => import("@/app/pages/list"));
const PageCreate = lazy(() => import("@/app/pages/create"));
const PageUpdate = lazy(() => import("@/app/pages/update"));

const PluginList = lazy(() => import("@/app/plugins/list"));
const PluginUpdate = lazy(() => import("@/app/plugins/update"));

const ProductList = lazy(() => import("@/app/products/list"));
const ProductCreate = lazy(() => import("@/app/products/create"));
const ProductUpdate = lazy(() => import("@/app/products/update"));
const ProductImagesUpdate = lazy(() => import("@/app/productsImages/update"));

const ProductTypeList = lazy(() => import("@/app/productTypes/list"));
const ProductTypeCreate = lazy(() => import("@/app/productTypes/create"));
const ProductTypeUpdate = lazy(() => import("@/app/productTypes/update"));

const ProductVariantsCreator = lazy(() => import("@/app/productsVariants/creator"));
const ProductVariantsCreate = lazy(() => import("@/app/productsVariants/create"));
const ProductVariantsUpdate = lazy(() => import("@/app/productsVariants/update"));

const SaleList = lazy(() => import("@/app/sales/list"));
const SaleCreate = lazy(() => import("@/app/sales/create"));
const SaleUpdate = lazy(() => import("@/app/sales/update"));

const SiteUpdate = lazy(() => import("@/app/site/update"));

const SupplierList = lazy(() => import("@/app/suppliers/list"));
const SupplierCreate = lazy(() => import("@/app/suppliers/create"));
const SupplierUpdate = lazy(() => import("@/app/suppliers/update"));

const VoucherList = lazy(() => import("@/app/vouchers/list"));
const VoucherCreate = lazy(() => import("@/app/vouchers/create"));
const VoucherUpdate = lazy(() => import("@/app/vouchers/update"));

export const Routes = () => (
  <Suspense fallback={<Loading />}>
    <ReactRoutes>
      <Route path="/*" element={<LayoutDashboard />} auth isPrivate>
        <Route
          path="configuration"
          element={<Configuration />}
          permissions={[
            PermissionEnum.MANAGE_ATTRIBUTES,
            PermissionEnum.MANAGE_GROUPS,
            PermissionEnum.MANAGE_MENUS,
            PermissionEnum.MANAGE_PAGES,
            PermissionEnum.MANAGE_PLUGINS,
            PermissionEnum.MANAGE_PRODUCT_TYPES,
            PermissionEnum.MANAGE_SETTINGS,
            PermissionEnum.MANAGE_STAFF,
            PermissionEnum.MANAGE_SUPPLIERS,
          ]}
        />

        <Route
          path="configuration/attributes"
          element={<AttributeList />}
          permissions={[PermissionEnum.MANAGE_ATTRIBUTES]}
        />
        <Route
          path="configuration/attributes/create"
          element={<AttributeCreate />}
          permissions={[PermissionEnum.MANAGE_ATTRIBUTES]}
        />
        <Route
          path="configuration/attributes/:id"
          element={<AttributeUpdate />}
          permissions={[PermissionEnum.MANAGE_ATTRIBUTES]}
        />

        <Route
          path="configuration/groups"
          element={<GroupList />}
          permissions={[PermissionEnum.MANAGE_GROUPS]}
        />
        <Route
          path="configuration/groups/create"
          element={<GroupCreate />}
          permissions={[PermissionEnum.MANAGE_GROUPS]}
        />
        <Route
          path="configuration/groups/:id"
          element={<GroupUpdate />}
          permissions={[PermissionEnum.MANAGE_GROUPS]}
        />

        <Route
          path="configuration/navigations"
          element={<NavigationList />}
          permissions={[PermissionEnum.MANAGE_MENUS]}
        />
        <Route
          path="configuration/navigations/:id"
          element={<NavigationUpdate />}
          permissions={[PermissionEnum.MANAGE_MENUS]}
        />

        <Route
          path="configuration/pages"
          element={<PageList />}
          permissions={[PermissionEnum.MANAGE_PAGES]}
        />
        <Route
          path="configuration/pages/create"
          element={<PageCreate />}
          permissions={[PermissionEnum.MANAGE_PAGES]}
        />
        <Route
          path="configuration/pages/:id"
          element={<PageUpdate />}
          permissions={[PermissionEnum.MANAGE_PAGES]}
        />

        <Route
          path="configuration/plugins"
          element={<PluginList />}
          permissions={[PermissionEnum.MANAGE_PLUGINS]}
        />
        <Route
          path="configuration/plugins/:id"
          element={<PluginUpdate />}
          permissions={[PermissionEnum.MANAGE_PLUGINS]}
        />

        <Route
          path="configuration/product-types"
          element={<ProductTypeList />}
          permissions={[PermissionEnum.MANAGE_PRODUCT_TYPES]}
        />
        <Route
          path="configuration/product-types/create"
          element={<ProductTypeCreate />}
          permissions={[PermissionEnum.MANAGE_PRODUCT_TYPES]}
        />
        <Route
          path="configuration/product-types/:id"
          element={<ProductTypeUpdate />}
          permissions={[PermissionEnum.MANAGE_PRODUCT_TYPES]}
        />

        <Route
          path="configuration/staff"
          element={<StaffList />}
          permissions={[PermissionEnum.MANAGE_STAFF]}
        />
        <Route
          path="configuration/staff/create"
          element={<StaffCreate />}
          permissions={[PermissionEnum.MANAGE_STAFF]}
        />
        <Route
          path="configuration/staff/:id"
          element={<StaffUpdate />}
          permissions={[PermissionEnum.MANAGE_STAFF]}
        />

        <Route
          path="configuration/site-settings"
          element={<SiteUpdate />}
          permissions={[PermissionEnum.MANAGE_SETTINGS]}
        />

        <Route
          path="configuration/suppliers"
          element={<SupplierList />}
          permissions={[PermissionEnum.MANAGE_SUPPLIERS]}
        />
        <Route
          path="configuration/suppliers/create"
          element={<SupplierCreate />}
          permissions={[PermissionEnum.MANAGE_SUPPLIERS]}
        />
        <Route
          path="configuration/suppliers/:id"
          element={<SupplierUpdate />}
          permissions={[PermissionEnum.MANAGE_SUPPLIERS]}
        />

        <Route
          path="categories"
          element={<CategoryList />}
          permissions={[PermissionEnum.MANAGE_CATEGORIES]}
        />
        <Route
          path="categories/create"
          element={<CategoryCreate />}
          permissions={[PermissionEnum.MANAGE_CATEGORIES]}
        />
        <Route
          path="categories/:id"
          element={<CategoryUpdate />}
          permissions={[PermissionEnum.MANAGE_CATEGORIES]}
        />
        <Route
          path="categories/:id/create"
          element={<CategoryCreate />}
          permissions={[PermissionEnum.MANAGE_CATEGORIES]}
        />

        <Route
          path="collections"
          element={<CollectionList />}
          permissions={[PermissionEnum.MANAGE_COLLECTIONS]}
        />
        <Route
          path="collections/create"
          element={<CollectionCreate />}
          permissions={[PermissionEnum.MANAGE_COLLECTIONS]}
        />
        <Route
          path="collections/:id"
          element={<CollectionUpdate />}
          permissions={[PermissionEnum.MANAGE_COLLECTIONS]}
        />

        <Route
          path="customers"
          element={<CustomerList />}
          permissions={[PermissionEnum.MANAGE_CUSTOMERS]}
        />
        <Route
          path="customers/create"
          element={<CustomerCreate />}
          permissions={[PermissionEnum.MANAGE_CUSTOMERS]}
        />
        <Route
          path="customers/:id"
          element={<CustomerUpdate />}
          permissions={[PermissionEnum.MANAGE_CUSTOMERS]}
        />

        <Route
          path="customers/:id/addresses"
          element={<CustomerAddressesList />}
          permissions={[PermissionEnum.MANAGE_CUSTOMERS]}
        />

        <Route
          path="products"
          element={<ProductList />}
          permissions={[PermissionEnum.MANAGE_PRODUCTS]}
        />
        <Route
          path="products/create"
          element={<ProductCreate />}
          permissions={[PermissionEnum.MANAGE_PRODUCTS]}
        />
        <Route
          path="products/:id"
          element={<ProductUpdate />}
          permissions={[PermissionEnum.MANAGE_PRODUCTS]}
        />
        <Route
          path="products/:id/variants-creator"
          element={<ProductVariantsCreator />}
          permissions={[PermissionEnum.MANAGE_PRODUCTS]}
        />
        <Route
          path="products/:id/variants/create"
          element={<ProductVariantsCreate />}
          permissions={[PermissionEnum.MANAGE_PRODUCTS]}
        />
        <Route
          path="products/:id/variants/:variantId"
          element={<ProductVariantsUpdate />}
          permissions={[PermissionEnum.MANAGE_PRODUCTS]}
        />
        <Route
          path="products/:id/images/:imageId"
          element={<ProductImagesUpdate />}
          permissions={[PermissionEnum.MANAGE_PRODUCTS]}
        />

        <Route
          path="sales"
          element={<SaleList />}
          permissions={[PermissionEnum.MANAGE_DISCOUNTS]}
        />
        <Route
          path="sales/create"
          element={<SaleCreate />}
          permissions={[PermissionEnum.MANAGE_DISCOUNTS]}
        />
        <Route
          path="sales/:id"
          element={<SaleUpdate />}
          permissions={[PermissionEnum.MANAGE_DISCOUNTS]}
        />

        <Route
          path="vouchers"
          element={<VoucherList />}
          permissions={[PermissionEnum.MANAGE_DISCOUNTS]}
        />
        <Route
          path="vouchers/create"
          element={<VoucherCreate />}
          permissions={[PermissionEnum.MANAGE_DISCOUNTS]}
        />
        <Route
          path="vouchers/:id"
          element={<VoucherUpdate />}
          permissions={[PermissionEnum.MANAGE_DISCOUNTS]}
        />

        <Route path="403" element={<Exception code={403} />} />
        <Route path="404" element={<Exception code={404} />} />
        <Route path="500" element={<Exception code={500} />} />
        <Route path="/*" element={<Navigate to="404" />} />
      </Route>
      <Route path="user/*" element={<LayoutUser />} auth>
        <Route path="login" element={<Login />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="reset-password-confirm" element={<ResetPasswordConfirm />} />
        <Route path="/*" element={<Navigate to="login" />} />
      </Route>
    </ReactRoutes>
  </Suspense>
);
