import React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";

import { filteredObject } from "..";

const qsOptions = {
  arrayFormat: "comma",
  parseBooleans: true,
  parseNumbers: true,
};

export const useQS = (allowedParams = [], defaultParams = {}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = React.useMemo(() => {
    const parseQS = qs.parse(location.search, qsOptions);
    if (allowedParams.length > 0) {
      return filteredObject(parseQS, allowedParams, defaultParams);
    } else {
      return parseQS;
    }
  }, [allowedParams, defaultParams, location.search]);

  const setParams = React.useCallback(
    (newParams) => {
      const _params =
        allowedParams.length > 0
          ? filteredObject(newParams, allowedParams, defaultParams)
          : newParams;
      const newQs = qs.stringify(_params, qsOptions);
      if (newQs) {
        navigate("?" + newQs);
      }
    },
    [allowedParams, defaultParams, navigate]
  );

  return [params, setParams];
};
