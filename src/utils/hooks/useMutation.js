import { useMutation as useMutationApollo } from "@apollo/react-hooks";

import { useNavigate } from "react-router-dom";
import { onError } from "./utils";

export const useMutation = (mutation, options = {}) => {
  const navigate = useNavigate();

  return useMutationApollo(mutation, {
    onError: (error) => onError(error, navigate),
    ...options,
  });
};
