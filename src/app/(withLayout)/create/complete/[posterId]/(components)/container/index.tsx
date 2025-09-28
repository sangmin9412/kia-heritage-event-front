"use client";

import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { usePosterStatus } from "@/features/poster/hooks/use-poster-status";
import { copyClipboard, getImagePath } from "@/lib/utils";
import Image from "next/image";
import { toast } from "sonner";

export const CreateCompletePosterContainer = ({ posterId }: { posterId: string }) => {
  const { data, isLoading, isError, error } = usePosterStatus(
    { posterId: Number(posterId) },
    {
      enabled: !!posterId,
      retry: 0,
      retryDelay: 3000
    }
  );
  const posterImage = data?.data.posterFile?.fileUrl ?? "";

  const handleFeedCertification = () => {
    // 모바일 환경 체크
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isMobile) {
      if (isIOS) {
        const urlScheme = "instagram://";

        // URL scheme으로 시도
        window.location.href = urlScheme;
      } else if (isAndroid) {
        // Android: Intent URL 사용
        const intentUrl = "intent://www.instagram.com/#Intent;package=com.instagram.android;scheme=https;end";
        const webUrl = "https://www.instagram.com/";

        try {
          window.location.href = intentUrl;
        } catch (error) {
          console.error(error);
          // Intent가 실패하면 웹으로 이동
          window.open(webUrl, "_blank");
        }
      } else {
        // 기타 모바일 디바이스
        window.open("https://www.instagram.com/", "_blank");
      }
    } else {
      // 데스크톱인 경우 웹으로 이동
      window.open("https://www.instagram.com/", "_blank");
    }
  };

  if (isError) {
    throw new Error(error?.message);
  }

  return (
    <div className='desktop:py-[8rem]'>
      <div className='mx-auto max-w-[86rem] desktop:shadow-[0_4px_15px_rgba(0,0,0,0.15)] animate-in fade-in slide-in-from-bottom-10 ease-in-out duration-1000'>
        <div className='desktop:p-[8rem_4.8rem_4.8rem] p-[3rem] text-center desktop:bg-white bg-[#f8f8f8]'>
          <h3 className='desktop:mb-[1.6rem] mb-[1.2rem] desktop:text-[3.2rem] text-[2.4rem] desktop:leading-[5.2rem] leading-[3.8rem] font-bold'>
            ‘My moments with Kia’
            <br /> 포스터가 완성되었어요!
          </h3>
          <p className='desktop:mb-[4rem] mb-[2.4rem] desktop:text-[2rem] text-[1.4rem] desktop:leading-[3.2rem] leading-[2.2rem] text-secondary'>
            완성된 포스터를 저장 후, 인스타그램 피드에
            <br className='block desktop:hidden' /> 게시물을 인증해 주세요!
            <br />
            인스타그램 피드에 게시물을 올려야
            <br className='block desktop:hidden' /> 이벤트 참여가 완료됩니다.
          </p>
          <div className='mx-auto desktop:max-w-[40rem] max-w-[31.5rem] shadow-[0_4px_18px_rgba(0,0,0,0.15)]'>
            {(!posterImage || isLoading) && (
              <div className='desktop:h-[50rem] h-[30rem] flex items-center justify-center'>
                <Loading />
              </div>
            )}
            {posterImage && !isLoading && (
              <Image
                src={posterImage}
                alt='포스터 이미지'
                width={400}
                height={500}
                unoptimized
                priority
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
              <ol className='desktop:max-w-[33.4rem] flex flex-col desktop:gap-[1.6rem] gap-[1.2rem] [counter-reset:list] desktop:[&>li]:pl-[3.8rem] [&>li]:pl-[3rem] [&>li]:relative [&>li]:[counter-increment:list] [&>li]:before:content-[counter(list)] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-0 desktop:[&>li]:before:w-[2.6rem] [&>li]:before:w-[2.2rem] desktop:[&>li]:before:h-[2.6rem] [&>li]:before:h-[2.2rem] [&>li]:before:bg-primary [&>li]:before:rounded-full desktop:[&>li]:before:text-[1.6rem] [&>li]:before:text-[1.2rem] desktop:[&>li]:before:leading-[2.8rem] [&>li]:before:leading-[2.3rem] [&>li]:before:font-bold [&>li]:before:text-center [&>li]:before:text-white'>
                <li>
                  <p>완성된 포스터를 다운로드해 주세요.</p>
                </li>
                <li>
                  <p>
                    참여 시 입력한 인스타그램 계정을 통해
                    <br /> 아래 해시태그 3개와 함께
                    <br /> 포스터를 피드에 업로드해 주세요.
                  </p>
                  <div className='pt-[0.8rem] flex flex-wrap items-center desktop:gap-[.4rem] gap-[.6rem]'>
                    <button className='desktop:px-[0.8rem] px-[0.4rem] desktop:text-[1.3rem] text-[1.2rem] desktop:leading-[2.8rem] leading-[2.4rem] bg-[#f8f8f8]'>
                      #기아와함께한순간
                    </button>
                    <button className='desktop:px-[0.8rem] px-[0.4rem] desktop:text-[1.3rem] text-[1.2rem] desktop:leading-[2.8rem] leading-[2.4rem] bg-[#f8f8f8]'>
                      #MymomentswithKia
                    </button>
                    <button className='desktop:px-[0.8rem] px-[0.4rem] desktop:text-[1.3rem] text-[1.2rem] desktop:leading-[2.8rem] leading-[2.4rem] bg-[#f8f8f8]'>
                      #기아80주년
                    </button>
                  </div>
                  <div className='mt-[.8rem]'>
                    <button
                      type='button'
                      className='p-[0_1.2rem] flex items-center gap-[.4rem] h-[3.6rem] border border-border text-[1.3rem] leading-[2rem] bg-[#fff] cursor-pointer'
                      onClick={async () => {
                        const hashtags = ["#기아와함께한순간", "#MymomentswithKia", "#기아80주년"];
                        const hashtagsString = hashtags.join(" ");
                        const result = await copyClipboard(hashtagsString);
                        if (result) {
                          toast("해시태그를 클립보드에 복사했습니다.");
                        } else {
                          toast("해시태그를 클립보드에 복사하는데 실패했습니다. 잠시 후 다시 시도해주세요.");
                        }
                      }}
                    >
                      <span>해시태그 전체 복사하기</span>
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-[2rem] h-[2rem]'
                      >
                        <path
                          d='M7.5 7.5V5.16683C7.5 4.23341 7.5 3.76635 7.68166 3.40983C7.84145 3.09623 8.09623 2.84144 8.40983 2.68166C8.76635 2.5 9.23341 2.5 10.1668 2.5H14.8335C15.7669 2.5 16.2334 2.5 16.5899 2.68166C16.9035 2.84144 17.1587 3.09623 17.3185 3.40983C17.5002 3.76635 17.5002 4.23306 17.5002 5.16648V9.83317C17.5002 10.7666 17.5002 11.2333 17.3185 11.5898C17.1587 11.9034 16.9033 12.1587 16.5897 12.3185C16.2335 12.5 15.7675 12.5 14.8359 12.5H12.5M7.5 7.5H5.16683C4.23341 7.5 3.76635 7.5 3.40983 7.68166C3.09623 7.84144 2.84144 8.09623 2.68166 8.40983C2.5 8.76635 2.5 9.23341 2.5 10.1668V14.8335C2.5 15.7669 2.5 16.2334 2.68166 16.5899C2.84144 16.9035 3.09623 17.1587 3.40983 17.3185C3.766 17.5 4.23249 17.5 5.16409 17.5H9.83629C10.7679 17.5 11.2337 17.5 11.5899 17.3185C11.9035 17.1587 12.1587 16.9033 12.3185 16.5897C12.5 16.2335 12.5 15.7675 12.5 14.8359V12.5M7.5 7.5H9.8335C10.7669 7.5 11.2334 7.5 11.5899 7.68166C11.9035 7.84144 12.1587 8.09623 12.3185 8.40983C12.5 8.766 12.5 9.2325 12.5 10.1641L12.5 12.5'
                          stroke='#697278'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </button>
                  </div>
                </li>
                <li>
                  <p>
                    업로드 시, <strong>기아 공식 인스타그램 계정(@kia.kor)</strong>을 꼭 태그 해주세요.
                  </p>
                </li>
                <li>
                  <p>
                    정확한 심사를 위해 이벤트 종료일까지 <br />
                    게시물을 유지해 주세요.
                  </p>
                  <p className='desktop:mt-[.4rem] mt-[.2rem] desktop:text-[1.4rem] text-[1.2rem] desktop:leading-[2.2rem] leading-[2rem] text-sub-text'>
                    (개인 인스타그램 계정 내 게시물 유지 필수)
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
          <Button variant='outline' className='flex-1' asChild>
            <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/posters/${posterId}/download`} download target='_blank'>
              포스터 다운로드
            </a>
          </Button>
          <Button className='flex-1' onClick={handleFeedCertification}>
            피드 인증하러 가기
          </Button>
        </div>
      </div>
    </div>
  );
};
