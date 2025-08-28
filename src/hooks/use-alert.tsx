import { useState, useCallback, ReactNode } from 'react';

interface AlertProps {
  title?: ReactNode;
  description?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const useAlert = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertProps, setAlertProps] = useState<AlertProps>({});

  const open = useCallback(({
    title,
    description,
    onConfirm,
    onCancel
  }: AlertProps) => {
    setAlertProps({ title, description, onConfirm, onCancel });
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleCloseComplete = useCallback(() => {
    setAlertProps({});
  }, []);

  return {
    isOpen,
    alertProps,
    open,
    close,
    onCloseComplete: handleCloseComplete
  };
}; 