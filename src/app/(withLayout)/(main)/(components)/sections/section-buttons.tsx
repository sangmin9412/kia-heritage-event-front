"use client";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config";
import { ANALYTICS_HANDLER, Event } from "@/lib/analytics";
import { useRouter } from "next/navigation";

export const SectionButtons = () => {
  const router = useRouter();
  const handleLearnMore = () => {
    ANALYTICS_HANDLER[Event.BTN_CLCK_LEARN_MORE].event();
  };
  const handleRegister = () => {
    ANALYTICS_HANDLER[Event.BTN_CLCK_REGISTER].event();
    router.push(ROUTES.ENTER_EVENT_FORM.link, { scroll: false });
  };

  return (
    <div className='py-[8rem] bg-white'>
      <div className='flex justify-center items-center gap-[1.6rem]'>
        <Button size='lg' variant='outline' className='w-[34rem]' onClick={handleLearnMore}>
          기아 헤리티지 더 알아보기
        </Button>
        <Button size='lg' className='w-[34rem]' onClick={handleRegister}>
          이벤트 참여하기
        </Button>
      </div>
    </div>
  );
};
