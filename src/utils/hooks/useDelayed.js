import { useEffect, useState } from "react";

export const useDelayed = (delay) => {
  const [delayed, setDelayed] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), delay);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (fn) => !delayed && fn();
};
