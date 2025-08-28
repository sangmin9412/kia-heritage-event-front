import { getImagePath } from "@/lib/utils";
import Image from "next/image";

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CreateTopBanner />
      <div className='pt-[8rem]'>{children}</div>
    </>
  );
}

const CreateTopBanner = () => {
  return (
    <div className='relative h-[30rem]'>
      <Image
        src={getImagePath("/images/create/top_banner_img_01_pc.webp")}
        alt='top-banner'
        fill
        className='object-cover pointer-events-none'
        unoptimized
        priority
      />
      <div className='container flex flex-col h-full'>
        <div className='flex items-center h-[8rem]'>
          <Image
            src={getImagePath("/images/common/logo.svg")}
            alt='top-banner'
            width={105}
            height={40}
            className='w-[105px] h-[40px] object-cover'
            unoptimized
            priority
          />
        </div>
        <div className='my-auto'>
          <h2 className='text-[4.2rem] leading-[6rem] font-bold text-white'>포스터 제작하기</h2>
        </div>
      </div>
    </div>
  );
};
