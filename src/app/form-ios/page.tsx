"use client";

import { ROUTES } from "@/config";
import { EventEnterFormIOS } from "@/features/poster/event-enter-form/components/form/form-ios";
import { useRouter } from "next/navigation";

export default function FormIOSPage() {
  const router = useRouter();

  return (
    <div className='relative p-[3.2rem_1.6rem] flex flex-col justify-center gap-[3.2rem] min-h-screen'>
      <div className='text-center'>
        <h2 className='desktop:text-[2.4rem] text-[1.6rem] desktop:leading-[3.8rem] leading-[2.6rem] font-semibold text-primary'>
          이벤트 참여하기
        </h2>
      </div>
      <EventEnterFormIOS />
      <button
        className="ring-offset-background focus:ring-ring absolute desktop:top-[1.6rem] desktop:right-[2.4rem] top-[1rem] right-[1rem] transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[4rem] cursor-pointer"
        onClick={() => {
          router.push(ROUTES.HOME.link);
        }}
      >
        <svg
          width='40'
          height='40'
          viewBox='0 0 40 40'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='desktop:size-[4rem] size-[2.4rem]'
        >
          <g transform='translate(8, 8)'>
            <path d='M22 2L2 22' stroke='#05141F' strokeWidth='2' strokeLinecap='square' strokeLinejoin='round' />
            <path d='M2 2L22 22' stroke='#05141F' strokeWidth='2' strokeLinecap='square' strokeLinejoin='round' />
          </g>
        </svg>
        <span className='sr-only'>Close</span>
      </button>
    </div>
  );
}
