import React from "react";

import { useStoreState } from "easy-peasy";
import { Navigate, Route as ReactRoute } from "react-router-dom";

export const Route = (props) => {
  const { auth, isPrivate, permissions = [], ...rest } = props;
  const user = useStoreState((state) => state.auth.user);
  const isLoggedIn = !!user;
  if (auth) {
    let checker, redirectPath;
    if (isPrivate) {
      checker = isLoggedIn;
      redirectPath = "user";
    } else {
      checker = !isLoggedIn;
      redirectPath = "/";
    }
    if (checker) {
      return <ReactRoute {...rest} />;
    } else {
      return <Navigate to={redirectPath} />;
    }
  } else if (permissions.length > 0) {
    const userPermissions = user.userPermissions.map((perm) => perm.code);
    const checkPermissions = (permission) => permissions.includes(permission);
    const gotPermissions = userPermissions.some(checkPermissions);

    if (gotPermissions) {
      return <ReactRoute {...rest} />;
    } else {
      return <Navigate to="/403" />;
    }
  } else {
    return <ReactRoute {...rest} />;
  }
};
