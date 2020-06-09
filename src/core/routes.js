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

const Configuration = lazy(() => import("@/app/configuration"));

const StaffList = lazy(() => import("@/app/staff/list"));
const StaffCreate = lazy(() => import("@/app/staff/create"));
const StaffUpdate = lazy(() => import("@/app/staff/update"));

const GroupList = lazy(() => import("@/app/groups/list"));
const GroupCreate = lazy(() => import("@/app/groups/create"));
const GroupUpdate = lazy(() => import("@/app/groups/update"));

const AttributeList = lazy(() => import("@/app/attributes/list"));
const AttributeCreate = lazy(() => import("@/app/attributes/create"));
const AttributeUpdate = lazy(() => import("@/app/attributes/update"));

const ProductTypeList = lazy(() => import("@/app/productTypes/list"));
const ProductTypeCreate = lazy(() => import("@/app/productTypes/create"));
const ProductTypeUpdate = lazy(() => import("@/app/productTypes/update"));

export const Routes = () => (
  <Suspense fallback={<Loading />}>
    <ReactRoutes>
      <Route path="/*" element={<LayoutDashboard />} auth isPrivate>
        <Route
          path="configuration"
          element={<Configuration />}
          permissions={[PermissionEnum.MANAGE_STAFF]}
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
          path="configuration/permission-groups"
          element={<GroupList />}
          permissions={[PermissionEnum.MANAGE_GROUPS]}
        />
        <Route
          path="configuration/permission-groups/create"
          element={<GroupCreate />}
          permissions={[PermissionEnum.MANAGE_GROUPS]}
        />
        <Route
          path="configuration/permission-groups/:id"
          element={<GroupUpdate />}
          permissions={[PermissionEnum.MANAGE_GROUPS]}
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
