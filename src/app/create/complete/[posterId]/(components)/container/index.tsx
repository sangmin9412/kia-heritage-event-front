import { Button } from "@/components/ui/button";
import { getImagePath } from "@/lib/utils";
import Image from "next/image";

export const CreateCompletePosterContainer = () => {
  return (
    <div className='py-[8rem]'>
      <div className='mx-auto max-w-[86rem] shadow-[0_4px_15px_rgba(0,0,0,0.15)] animate-in fade-in slide-in-from-bottom-10 ease-in-out duration-1000'>
        <div className='p-[8rem_4.8rem_4.8rem] text-center'>
          <h3 className='mb-[1.6rem] text-[2.4rem] leading-[3.8rem] font-bold'>
            ‘My moments with Kia’ 포스터가 완성되었어요!
          </h3>
          <p className='mb-[4rem] text-[2rem] leading-[3.2rem] text-secondary'>
            완성된 포스터를 저장 후, 인스타그램 피드에 게시물을 인증해주세요!
            <br />
            인스타그램 피드에 게시물을 올려야 이벤트 참여가 완료됩니다.
          </p>
          <div className='mx-auto max-w-[40rem] h-[50rem] shadow-[0_4px_18px_rgba(0,0,0,0.15)]'></div>
        </div>

        <div className='p-[4rem_4.8rem]'>
          <div>
            <h4 className='text-[1.8rem] leading-[6.2rem] font-bold text-center bg-primary text-white'>
              인스타그램 피드 인증 방법
            </h4>
          </div>
          <div className='p-[4.8rem] flex justify-between border border-t-0 border-border'>
            <div>
              <ol className='max-w-[32.1rem] flex flex-col gap-[1.6rem] [counter-reset:list] [&>li]:pl-[3.8rem] [&>li]:relative [&>li]:[counter-increment:list] [&>li]:before:content-[counter(list)] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-0 [&>li]:before:w-[2.6rem] [&>li]:before:h-[2.6rem] [&>li]:before:bg-primary [&>li]:before:rounded-full [&>li]:before:text-[1.6rem] [&>li]:before:leading-[2.8rem] [&>li]:before:font-bold [&>li]:before:text-center [&>li]:before:text-white'>
                <li>
                  <p>완성된 포스터를 다운로드해 주세요.</p>
                </li>
                <li>
                  <p>참여시 입력한 인스타그램 계정을 통해 아래 해시태그 3개와 함께 포스터를 피드에 업로드해 주세요.</p>
                  <div className='pt-[0.8rem] flex flex-wrap items-center gap-[.4rem]'>
                    <button className='px-[0.8rem] text-[1.3rem] leading-[2.8rem] bg-[#f8f8f8]'>
                      #기아와함께한순간
                    </button>
                    <button className='px-[0.8rem] text-[1.3rem] leading-[2.8rem] bg-[#f8f8f8]'>
                      #기아헤리티지이벤트
                    </button>
                    <button className='px-[0.8rem] text-[1.3rem] leading-[2.8rem] bg-[#f8f8f8]'>#기아80주년</button>
                  </div>
                </li>
                <li>
                  <p>
                    업로드 시, <strong>기아 공식 인스타 계정(@Kia.kor)</strong>을 꼭 태그 해주세요.
                  </p>
                </li>
                <li>
                  <p>참여시 입력한 인스타그램 계정을 통해 아래 해시태그 3개와 함께 포스터를 피드에 업로드해 주세요.</p>
                  <p className='mt-[.4rem] text-[1.4rem] leading-[2.2rem] text-sub-text'>
                    (2025.11.00일까지 개인 인스타그램 계정내 게시물 유지 필수)
                  </p>
                </li>
              </ol>
            </div>
            <div>
              <Image
                src={getImagePath("/images/create/instagram_guide_img_01.webp")}
                alt='인스타그램 피드 인증 방법'
                width={251}
                height={398}
                unoptimized
                className='w-[25.1rem] h-[39.8rem]'
              />
            </div>
          </div>
        </div>

        <div className='p-[2.4rem_4.8rem] flex gap-[1.6rem] border-t border-border'>
          <Button variant='outline' className='flex-1'>
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
