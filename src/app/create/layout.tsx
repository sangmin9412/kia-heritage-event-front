"use client";

import { useAlertDialog } from "@/components/contexts";
import { getImagePath } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  const { open } = useAlertDialog();
  const router = useRouter();
  useEffect(() => {
    // 이벤트 참여 정보가 없으면 알림 띄우기
    const localStorageEventEnterForm = localStorage.getItem("event-enter-form");

    const isEventEnterForm = !!localStorageEventEnterForm;
    if (!isEventEnterForm) {
      open({
        title: "이벤트 참여 정보가 없습니다.",
        description: "메인 페이지로 이동하여<br /> 이벤트 참여 정보를 입력해주세요.",
        onConfirm() {
          router.push("/");
        },
        onClose() {
          router.push("/");
        }
      });
    }
  }, [router, open]);

  return (
    <>
      <CreateTopBanner />
      <div>{children}</div>
    </>
  );
}

const CreateTopBanner = () => {
  return (
    <div className='relative h-[21.4rem] bg-primary'>
      <div className='container flex flex-col justify-center gap-[4.8rem] h-full'>
        <div className='flex items-center'>
          <Link href='/'>
            <Image
              src={getImagePath("/images/common/logo.svg")}
              alt='top-banner'
              width={84}
              height={32}
              className='w-[84px] h-[32px] object-cover'
              unoptimized
              priority
            />
          </Link>
        </div>
        <div>
          <h2 className='text-[3.2rem] leading-[3.8rem] font-bold text-white animate-in fade-in slide-in-from-bottom-50 ease-in-out duration-1000'>
            포스터 제작하기
          </h2>
        </div>
      </div>
    </div>
  );
};
