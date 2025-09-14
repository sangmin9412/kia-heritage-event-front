import { toast as sonnerToast } from "sonner";

export const useToaster = () => {
  const toast = sonnerToast;

  return { toast };
};
