"use client";

import { ReactNode } from "react";
import { AlertProvider } from "@/components/contexts";
import { Toaster } from "@/components/features/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface AppProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 5
    }
  }
});

export function AppProvider({ children }: AppProviderProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AlertProvider>
          {children}
          <Toaster />
        </AlertProvider>
      </QueryClientProvider>
    </>
  );
}
