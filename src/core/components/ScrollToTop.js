import { useEffect } from "react";

import { useLocation } from "react-router-dom";

export const ScrollToTop = ({ children }) => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, [pathname, search]);

  return children;
};
