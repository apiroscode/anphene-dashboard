import React, { lazy, Suspense } from "react";

import { Navigate, Routes as ReactRoutes } from "react-router-dom";

import { PermissionEnum } from "@/config/enum";

import { Route } from "./components/Route";
import { Loading } from "./components/Loading";

const LayoutUser = lazy(() => import("./layoutUser"));
const LayoutDashboard = lazy(() => import("./layoutDashboard"));

const Login = lazy(() => import("@/app/users/Login"));
const ResetPassword = lazy(() => import("@/app/users/ResetPassword"));
const ResetPasswordConfirm = lazy(() => import("@/app/users/ResetPasswordConfirm"));

const Configuration = lazy(() => import("@/app/configuration"));

const StaffList = lazy(() => import("@/app/staff/list"));

const GroupList = lazy(() => import("@/app/groups/list"));
const GroupCreate = lazy(() => import("@/app/groups/create"));

const NotFound = () => {
  return <div>Not found</div>;
};

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
          path="configuration/permission-groups"
          element={<GroupList />}
          permissions={[PermissionEnum.MANAGE_GROUPS]}
        />
        <Route
          path="configuration/permission-groups/create"
          element={<GroupCreate />}
          permissions={[PermissionEnum.MANAGE_GROUPS]}
        />
        <Route path="403" element={<NotFound code={403} />} />
        <Route path="404" element={<NotFound code={404} />} />
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
