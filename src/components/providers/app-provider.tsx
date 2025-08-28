import { ReactNode } from "react";
import { AlertProvider } from "@/components/contexts";
import { Toaster } from "@/components/features/toast";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <>
      <AlertProvider>
        {children}
        <Toaster />
      </AlertProvider>
    </>
  );
}
