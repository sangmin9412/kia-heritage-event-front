"use client";

import { CreateAlert } from "@/app/(withLayout)/create/(components)/alert";
import { ROUTES } from "@/config";
import { getImagePath } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { ErrorBoundaryWrapper } from "@/components/providers/ErrorBoundary";

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CreateTopBanner />
      <ErrorBoundaryWrapper>
        <div>{children}</div>
      </ErrorBoundaryWrapper>
      <CreateAlert />
    </>
  );
}

const CreateTopBanner = () => {
  return (
    <div className='relative desktop:p-0 p-[2.4rem_0_1.6rem] desktop:h-[21.4rem] h-auto bg-primary'>
      <div className='container flex flex-col justify-center desktop:gap-[4.8rem] gap-[2.4rem] h-full desktop:px-[3rem] px-[1.6rem]'>
        <div className='flex items-center'>
          <Link href={ROUTES.HOME.link}>
            <Image
              src={getImagePath("/images/common/logo.svg")}
              alt='top-banner'
              width={84}
              height={32}
              className='desktop:w-[8.4rem] w-[6.3rem] h-auto object-cover'
              unoptimized
              priority
            />
          </Link>
        </div>
        <div>
          <h2 className='desktop:text-[3.2rem] text-[1.8rem] desktop:leading-[3.8rem] leading-[3rem] font-bold text-white animate-in fade-in slide-in-from-bottom-50 ease-in-out duration-1000 desktop:text-left text-center'>
            <CreateTopBannerTitle />
          </h2>
        </div>
      </div>
    </div>
  );
};

const CreateTopBannerTitle = () => {
  const pathname = usePathname();
  const params = useParams();

  // 동적 라우팅 페이지인지 확인
  const isDynamicRoute = Object.keys(params).length > 0;

  if (isDynamicRoute) {
    // 동적 라우팅의 경우 처리
    // 예: /create/complete/:posterId -> "포스터 생성 완료"
    const basePath = pathname.split("/").slice(0, -1).join("/");
    return Object.values(ROUTES).find(route => route.link.replace(/\/:[^/]+/, "") === basePath)?.layoutTitle || "";
  }

  // 정적 라우팅의 경우 기존 로직

  return Object.values(ROUTES).find(route => route.link === pathname)?.layoutTitle || "";
};
