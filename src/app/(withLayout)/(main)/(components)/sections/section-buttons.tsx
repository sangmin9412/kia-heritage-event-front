"use client";

import { Button } from "@/components/ui/button";
import { ROUTES, EVENT_START_DATE_TIME } from "@/config";
import { ANALYTICS_HANDLER, Event } from "@/lib/analytics";
import { isAfterDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

export const SectionButtons = () => {
  const router = useRouter();
  const [isEventActive, setIsEventActive] = useState(false);

  // 한국시간 2025년 9월 29일 08:00:00
  const eventStartDateTime = EVENT_START_DATE_TIME;

  useEffect(() => {
    const checkEventStatus = () => {
      const currentDateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      setIsEventActive(isAfterDate(eventStartDateTime, currentDateTime));
    };

    // 초기 체크
    checkEventStatus();

    // 1분마다 체크 (정확한 시간에 활성화하기 위해)
    const interval = setInterval(checkEventStatus, 60000);

    return () => clearInterval(interval);
  }, [eventStartDateTime]);

  const handleRegister = () => {
    ANALYTICS_HANDLER[Event.BTN_CLCK_REGISTER].event();
    router.push(ROUTES.ENTER_EVENT_FORM.link, { scroll: false });
  };

  return (
    <div className='desktop:py-[8rem] py-[3rem] px-[3rem] bg-white'>
      <div className='flex desktop:flex-row flex-col justify-center items-center desktop:gap-[1.6rem] gap-[1.2rem]'>
        {/* <Button size='lg' variant='outline' className='desktop:w-[34rem] w-full' onClick={handleLearnMore}>
          기아 헤리티지 더 알아보기
        </Button> */}
        <Button size='lg' className='desktop:w-[34rem] w-full' disabled={!isEventActive} onClick={handleRegister}>
          이벤트 참여하기
        </Button>
      </div>
    </div>
  );
};
