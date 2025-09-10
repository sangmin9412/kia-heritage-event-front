"use client";

import { Button } from "@/components/ui/button";
import { downloadImage, getImagePath } from "@/lib/utils";
import Image from "next/image";
import { useEventEnterFormStore } from "@/features/poster/store";

export const CreateCompletePosterContainer = () => {
  const posterImage = useEventEnterFormStore(state => state.posterImage);

  return (
    <div className='desktop:py-[8rem]'>
      <div className='mx-auto max-w-[86rem] desktop:shadow-[0_4px_15px_rgba(0,0,0,0.15)] animate-in fade-in slide-in-from-bottom-10 ease-in-out duration-1000'>
        <div className='desktop:p-[8rem_4.8rem_4.8rem] p-[3rem] text-center desktop:bg-white bg-[#f8f8f8]'>
          <h3 className='desktop:mb-[1.6rem] mb-[1.2rem] desktop:text-[2.4rem] text-[1.8rem] desktop:leading-[3.8rem] leading-[3rem] font-bold'>
            ‘My moments with Kia’
            <br className='desktop:hidden block' /> 포스터가 완성되었어요!
          </h3>
          <p className='desktop:mb-[4rem] mb-[2.4rem] desktop:text-[2rem] text-[1.4rem] desktop:leading-[3.2rem] leading-[2.2rem] text-secondary'>
            완성된 포스터를 저장 후, 인스타그램 피드에 게시물을 인증해주세요!
            <br className='desktop:block hidden' />
            인스타그램 피드에 게시물을 올려야 이벤트 참여가 완료됩니다.
          </p>
          <div className='desktop:mx-auto mx-[1.8rem] desktop:max-w-[40rem] shadow-[0_4px_18px_rgba(0,0,0,0.15)]'>
            {posterImage && (
              <Image
                src={posterImage}
                alt='포스터 이미지'
                width={400}
                height={500}
                unoptimized
                className='w-full h-auto object-cover'
              />
            )}
          </div>
        </div>

        <div className='desktop:p-[4rem_4.8rem] p-[3rem]'>
          <div>
            <h4 className='desktop:text-[1.8rem] text-[1.4rem] desktop:leading-[6.2rem] leading-[4.6rem] font-bold text-center bg-primary text-white'>
              인스타그램 피드 인증 방법
            </h4>
          </div>
          <div className='desktop:p-[4.8rem] flex desktop:flex-row flex-col-reverse justify-between border border-t-0 border-border'>
            <div className='desktop:p-0 p-[1.6rem]'>
              <ol className='desktop:max-w-[32.1rem] flex flex-col desktop:gap-[1.6rem] gap-[1.2rem] [counter-reset:list] desktop:[&>li]:pl-[3.8rem] [&>li]:pl-[3rem] [&>li]:relative [&>li]:[counter-increment:list] [&>li]:before:content-[counter(list)] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-0 desktop:[&>li]:before:w-[2.6rem] [&>li]:before:w-[2.2rem] desktop:[&>li]:before:h-[2.6rem] [&>li]:before:h-[2.2rem] [&>li]:before:bg-primary [&>li]:before:rounded-full desktop:[&>li]:before:text-[1.6rem] [&>li]:before:text-[1.2rem] desktop:[&>li]:before:leading-[2.8rem] [&>li]:before:leading-[2.3rem] [&>li]:before:font-bold [&>li]:before:text-center [&>li]:before:text-white'>
                <li>
                  <p>완성된 포스터를 다운로드해 주세요.</p>
                </li>
                <li>
                  <p>참여시 입력한 인스타그램 계정을 통해 아래 해시태그 3개와 함께 포스터를 피드에 업로드해 주세요.</p>
                  <div className='pt-[0.8rem] flex flex-wrap items-center desktop:gap-[.4rem] gap-[.6rem]'>
                    <button className='desktop:px-[0.8rem] px-[0.4rem] desktop:text-[1.3rem] text-[1.2rem] desktop:leading-[2.8rem] leading-[2.4rem] bg-[#f8f8f8]'>
                      #기아와함께한순간
                    </button>
                    <button className='desktop:px-[0.8rem] px-[0.4rem] desktop:text-[1.3rem] text-[1.2rem] desktop:leading-[2.8rem] leading-[2.4rem] bg-[#f8f8f8]'>
                      #기아헤리티지이벤트
                    </button>
                    <button className='desktop:px-[0.8rem] px-[0.4rem] desktop:text-[1.3rem] text-[1.2rem] desktop:leading-[2.8rem] leading-[2.4rem] bg-[#f8f8f8]'>
                      #기아80주년
                    </button>
                  </div>
                </li>
                <li>
                  <p>
                    업로드 시, <strong>기아 공식 인스타 계정(@Kia.kor)</strong>을 꼭 태그 해주세요.
                  </p>
                </li>
                <li>
                  <p>참여시 입력한 인스타그램 계정을 통해 아래 해시태그 3개와 함께 포스터를 피드에 업로드해 주세요.</p>
                  <p className='desktop:mt-[.4rem] mt-[.2rem] desktop:text-[1.4rem] text-[1.2rem] desktop:leading-[2.2rem] leading-[2rem] text-sub-text'>
                    (2025.11.00일까지 개인 인스타그램 계정내 게시물 유지 필수)
                  </p>
                </li>
              </ol>
            </div>
            <div className='desktop:p-0 p-[1.6rem] flex items-center justify-center'>
              <Image
                src={getImagePath("/images/create/instagram_guide_img_01.webp")}
                alt='인스타그램 피드 인증 방법'
                width={251}
                height={398}
                unoptimized
                className='desktop:w-[25.1rem] w-[22rem] h-auto'
              />
            </div>
          </div>
        </div>

        <div className='desktop:p-[2.4rem_4.8rem] p-[1.6rem] sticky bottom-0 flex desktop:gap-[1.6rem] gap-[1.2rem] bg-white border-t border-border'>
          <Button variant='outline' className='flex-1' onClick={() => downloadImage(posterImage)}>
            포스터 다운로드
          </Button>
          <Button className='flex-1' disabled>
            피드 인증하러 가기
          </Button>
        </div>
      </div>
    </div>
  );
};
