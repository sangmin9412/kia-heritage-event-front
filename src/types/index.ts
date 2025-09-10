export interface ComponentBaseProps {
  children?: React.ReactNode;
  className?: string;
}

// Google Analytics gtag type declarations
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: {
        allow_custom_scripts?: boolean;
        send_to?: string;
        [key: string]: unknown;
      }
    ) => void;
  }
}

export type valueof<T> = T[keyof T];
