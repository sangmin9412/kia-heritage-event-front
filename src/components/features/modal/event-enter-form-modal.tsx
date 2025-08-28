"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { EventEnterForm } from "@/components/features/form/event-enter-form";
import { DialogLenisWrapper } from "@/components/features/modal/dialog-lenis-wrapper";

export function EventEnterFormModal() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <DialogLenisWrapper>
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className='max-w-[76rem]'>
          <DialogHeader>
            <DialogTitle>이벤트 참여하기</DialogTitle>
          </DialogHeader>
          <DialogDescription className='sr-only'>이벤트 참여를 위해 아래 필수 정보를 입력해주세요.</DialogDescription>
          <EventEnterForm />
        </DialogContent>
      </Dialog>
    </DialogLenisWrapper>
  );
}
