import { useQuery as useQueryApollo } from "@apollo/react-hooks";

import { useNavigate } from "react-router-dom";
import { onError } from "./utils";

export const useQuery = (query, options = {}) => {
  const navigate = useNavigate();

  return useQueryApollo(query, {
    onError: (error) => onError(error, navigate),
    ...options,
  });
};
