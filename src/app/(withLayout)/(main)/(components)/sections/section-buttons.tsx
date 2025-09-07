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
    <div className='desktop:py-[8rem] py-[3rem] px-[3rem] bg-white'>
      <div className='flex desktop:flex-row flex-col justify-center items-center desktop:gap-[1.6rem] gap-[1.2rem]'>
        <Button size='lg' variant='outline' className='desktop:w-[34rem] w-full' onClick={handleLearnMore}>
          기아 헤리티지 더 알아보기
        </Button>
        <Button size='lg' className='desktop:w-[34rem] w-full' onClick={handleRegister}>
          이벤트 참여하기
        </Button>
      </div>
    </div>
  );
};
