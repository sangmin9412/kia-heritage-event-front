"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import { DialogLenisWrapper } from "@/components/features/modal/dialog-lenis-wrapper";
import { EventEnterForm } from "@/features/poster/components/event-enter-form";
import { ROUTES } from "@/config";

export function EventEnterFormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsOpen(true);
    return () => {
      setIsOpen(false);
    };
  }, []);

  useEffect(() => {
    setIsOpen(pathname === ROUTES.ENTER_EVENT_FORM.link);
  }, [pathname]);

  const handleClose = () => {
    router.push(ROUTES.HOME.link, { scroll: false });
  };

  return (
    <DialogLenisWrapper open={isOpen}>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className='desktop:max-w-[76rem] max-w-[calc(100%-6rem)] max-h-[calc(100%-4rem)] flex flex-col'>
          <DialogHeader className='flex-[0_0_auto]'>
            <DialogTitle>이벤트 참여하기</DialogTitle>
          </DialogHeader>
          <DialogDescription className='sr-only'>이벤트 참여를 위해 아래 필수 정보를 입력해주세요.</DialogDescription>
          <EventEnterForm />
        </DialogContent>
      </Dialog>
    </DialogLenisWrapper>
  );
}
