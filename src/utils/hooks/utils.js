import { maybe } from "@/utils";

export const onError = ({ message, graphQLErrors, networkError }, navigate) => {
  if (networkError) {
    navigate("/500");
  } else if (graphQLErrors.length > 0) {
    if (
      graphQLErrors.every(
        (err) => maybe(() => err.extensions.exception.code) === "PermissionDenied"
      )
    ) {
      navigate("/403");
    } else {
      navigate("/500");
    }
  }
};
