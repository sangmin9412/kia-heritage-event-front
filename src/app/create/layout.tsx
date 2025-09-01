import { CreateAlert } from "@/app/create/(components)/alert";
import { getImagePath } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CreateTopBanner />
      <div>{children}</div>
      <CreateAlert />
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
