import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogClose
} from "@/components/ui/alert-dialog";
import { useCallback } from "react";

interface AlertProps {
  isOpen: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  onOpenChange: (open: boolean) => void;
  onClose?: () => void;
  onCloseComplete?: () => void;
}

export function Alert({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
  onOpenChange,
  onClose,
  onCloseComplete
}: AlertProps) {
  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handleAnimationEnd = useCallback(
    (e: React.AnimationEvent) => {
      // AlertDialog가 닫힐 때의 애니메이션이 끝나면 호출
      if (!isOpen && e.animationName.includes("exit")) {
        onCloseComplete?.();
        onClose?.();
      }
    },
    [isOpen, onCloseComplete, onClose]
  );

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent
        onAnimationEnd={handleAnimationEnd}
        className='max-w-[31.5rem] desktop:max-w-[46.4rem] w-full p-[2rem] pt-[4.8rem] lg:p-[4.8rem] gap-0'
      >
        <AlertDialogHeader className='mb-[3.2rem] space-y-0'>
          <AlertDialogTitle>{title || ""}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription
              className='text-[1.4rem] lg:text-[1.6rem] leading-[2.2rem] lg:leading-[2.6rem] text-center text-black'
              dangerouslySetInnerHTML={{ __html: description }}
            ></AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {onCancel && (
            <AlertDialogCancel
              onClick={handleCancel}
              className='flex-1 lg:max-w-[24rem] p-[1.2rem] text-[1.4rem] lg:text-[1.6rem] h-[4.8rem]'
            >
              취소
            </AlertDialogCancel>
          )}
          {onConfirm && (
            <AlertDialogAction
              onClick={handleConfirm}
              className='flex-1 lg:max-w-[24rem] p-[1.2rem] text-[1.4rem] lg:text-[1.6rem] h-[4.8rem]'
            >
              확인
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
        <div className='flex absolute right-4 top-4'>
          <AlertDialogClose />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
