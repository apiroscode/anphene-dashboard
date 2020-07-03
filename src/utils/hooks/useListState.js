import { useState } from "react";

export const useListState = (defaultValues = []) => {
  const [state, setState] = useState(defaultValues);
};
