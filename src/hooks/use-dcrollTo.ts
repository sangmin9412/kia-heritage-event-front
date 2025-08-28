import { useCallback } from "react";

interface ScrollToOptions {
  behavior?: ScrollBehavior;
  offset?: number;
}

export const useScrollTo = () => {
  const scrollTo = useCallback((top: number, options: ScrollToOptions = {}) => {
    const { behavior = "auto", offset = 0 } = options;

    window.scrollTo({
      top: top - offset,
      behavior: behavior
    });
  }, []);

  return scrollTo;
};
