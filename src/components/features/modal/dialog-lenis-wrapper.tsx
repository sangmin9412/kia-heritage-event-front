"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

export const DialogLenisWrapper = ({ children }: { children: React.ReactNode }) => {
  const lenis = useLenis();

  useEffect(() => {
    lenis?.stop();
    return () => {
      lenis?.start();
    };
  }, [lenis]);

  return children;
};
