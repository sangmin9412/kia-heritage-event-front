import Image from "next/image";
import { getImagePath } from "@/lib/utils";

export const SectionKeyVisual = () => {
  return (
    <section>
      <h2 className='blind'>메인 비주얼 섹션</h2>
      <div className='relative h-[86rem] overflow-hidden wide:h-auto'>
        <div className='absolute w-[192rem] h-[86rem] top-0 left-1/2 -translate-x-1/2 wide:static wide:w-full wide:h-auto wide:translate-x-0'>
          <Image
            src={getImagePath("/images/main/main_kv.webp")}
            alt='event-keyvisual'
            width={1920}
            height={860}
            className='w-full h-full object-cover'
            unoptimized
            priority
          />
        </div>
      </div>
    </section>
  );
};
