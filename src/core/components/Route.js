import React from "react";

import { Navigate, Route as ReactRoute } from "react-router-dom";

import { usePermissions } from "@/utils/hooks";

export const Route = (props) => {
  const { auth, isPrivate, permissions = [], ...rest } = props;
  const [gotPermissions, isLoggedIn] = usePermissions(permissions);

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
    if (gotPermissions) {
      return <ReactRoute {...rest} />;
    } else {
      return <Navigate to="/403" />;
    }
  } else {
    return <ReactRoute {...rest} />;
  }
};
