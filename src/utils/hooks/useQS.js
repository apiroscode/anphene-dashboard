import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";

const qsOptions = {
  arrayFormat: "comma",
  parseBooleans: true,
  parseNumbers: true,
};

export const filteredObject = (raw, keys) => {
  return Object.keys(raw)
    .filter((key) => keys.includes(key))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: raw[key],
      };
    }, {});
};

export const useQS = (defaultParams) => {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultKey = Object.keys(defaultParams);

  const params = useMemo(() => {
    const parseQS = qs.parse(location.search, qsOptions);
    return { ...defaultParams, ...filteredObject(parseQS, defaultKey) };
  }, [defaultKey, location.search, defaultParams]);

  const setParams = useCallback(
    (newParams) => {
      const newQs = qs.stringify(
        { ...params, ...filteredObject(newParams, defaultKey) },
        qsOptions
      );
      const newParamsUrl = newQs ? `${location.pathname}?${newQs}` : location.pathname;
      navigate(newParamsUrl);
    },
    [params, navigate, defaultKey, location]
  );

  return [params, setParams];
};
