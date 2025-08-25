import { getImagePath } from "@/lib/utils";
import Image from "next/image";

export const SectionInstagramEvent = () => {
  return (
    <section className='py-[8rem] bg-[#f8f8f8]'>
      <h2 className='blind'>인스타그램 스토리 공유 이벤트 섹션</h2>
      <div className='container'>
        <div className='flex'>
          <div className='flex-[0_0_68rem]'>
            <div className='flex w-[68rem] h-[47.8rem]'>
              <Image
                src={getImagePath("/images/main/share_item_01.webp")}
                alt='이벤트 공유 이미지'
                width={680}
                height={478}
                unoptimized
                className='w-full h-full object-contain'
              />
            </div>
          </div>
          <div className='flex-1 px-[2.4rem] bg-white'>
            <div className='p-[4.8rem_2.4rem_4rem] border-b border-border'>
              <h3 className='mb-[1.6rem] text-[2rem] leading-[3.2rem] font-bold'>인스타그램 스토리 공유 이벤트</h3>
              <p className='text-sub-text'>
                완성된 포스터를 저장한 뒤,
                <br />
                인스타그램 스토리에 나만의 포스터를 인증해보세요.
              </p>
            </div>
            <div className='p-[4.8rem_2.4rem_0]'>
              <div>
                <ol className='flex flex-col gap-[1.2rem] [counter-reset:step] [counter-increment:step]'>
                  <li className='relative pl-[2.7rem] before:content-[counter(step)"."] before:absolute before:left-0 before:top-0'>
                    <p>완성된 포스터를 다운로드 해 주세요.</p>
                  </li>
                  <li className='relative pl-[2.7rem] [counter-increment:step] before:content-[counter(step)"."] before:absolute before:left-0 before:top-0'>
                    <p>
                      인스타그램 스토리에 포스터를 업로드하고, <strong>‘Kia 80주년 지피 스티커’</strong>를 붙여
                      꾸며보세요.
                    </p>
                  </li>
                  <li className='relative pl-[2.7rem] [counter-increment:step] before:content-[counter(step)"."] before:absolute before:left-0 before:top-0'>
                    <p>
                      업로드 시, <strong>기아 공식 인스타그램 계정(@kia.kor)</strong>을 꼭 태그해 주세요!
                    </p>
                  </li>
                </ol>
              </div>
              <div className='mt-[3.2rem] py-[1.5rem] [counter-increment:step] flex justify-center items-center border border-border rounded-[5.8rem]'>
                <p>
                  참여하신 분들께 추첨을 통해 <strong>커피쿠폰 (1매)</strong>를 드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
