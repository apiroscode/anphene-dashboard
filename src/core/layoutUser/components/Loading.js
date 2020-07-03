import React from "react";

import { CircularProgress } from "@material-ui/core";

import { useDelayed } from "@/utils/hooks";
import { DELAYED_TIMEOUT } from "@/config/constants";

export const Loading = () => {
  const delayed = useDelayed(DELAYED_TIMEOUT);

  return delayed(() => <CircularProgress size={32} thickness={2} />);
};
