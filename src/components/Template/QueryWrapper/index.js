import React, { useEffect } from "react";

import { useStoreActions } from "easy-peasy";
import { Navigate } from "react-router";

import { maybe } from "@/utils";
import { useQuery } from "@/utils/hooks";

export const QueryWrapper = (props) => {
  const { id, vars, query, fieldName, children } = props;
  const variables = vars !== undefined ? vars : { id };

  const toggleLoading = useStoreActions((actions) => actions.app.toggleLoading);
  const { data, loading } = useQuery(query, { variables });
  const baseField = maybe(() => data?.[fieldName]);
  useEffect(() => {
    toggleLoading(loading);
  }, [toggleLoading, loading]);

  return data !== undefined ? baseField !== null ? children(data) : <Navigate to="/404" /> : null;
};
