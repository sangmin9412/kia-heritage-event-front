"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import { DialogLenisWrapper } from "@/components/features/modal/dialog-lenis-wrapper";
import { EventEnterForm } from "@/features/poster/components/event-enter-form";

export function EventEnterFormModal() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    setIsOpen(pathname === "/form");
  }, [pathname]);

  const handleClose = () => {
    router.back();
  };

  return (
    <DialogLenisWrapper open={isOpen}>
      <Dialog open={isOpen} onOpenChange={handleClose}>
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
