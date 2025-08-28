"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { Alert } from "@/components/features/alert";
import { useAlert } from "@/hooks/use-alert";

interface AlertProps {
  title?: ReactNode;
  description?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface AlertContextType {
  open: (props: AlertProps) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const { isOpen, alertProps, open, close, onCloseComplete } = useAlert();

  return (
    <AlertContext.Provider value={{ open }}>
      {children}
      <Alert isOpen={isOpen} onOpenChange={close} onCloseComplete={onCloseComplete} {...alertProps} />
    </AlertContext.Provider>
  );
}

export function useAlertDialog() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlertDialog must be used within an AlertProvider");
  }
  return context;
}
