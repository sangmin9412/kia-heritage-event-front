"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

interface DialogLenisWrapperProps {
  children: React.ReactNode;
  open: boolean;
}

export const DialogLenisWrapper = ({ children, open }: DialogLenisWrapperProps) => {
  const lenis = useLenis();

  useEffect(() => {
    console.log("open", open);
    if (open) {
      lenis?.stop();
    } else {
      lenis?.start();
    }

    return () => {
      lenis?.start();
    };
  }, [lenis, open]);

  return children;
};
