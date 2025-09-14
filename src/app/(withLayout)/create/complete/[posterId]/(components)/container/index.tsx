"use client";

import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { getPosterImage } from "@/features/poster/api";
import { usePosterStatus } from "@/features/poster/hooks/use-poster-status";
import { downloadImage, getImagePath } from "@/lib/utils";
import { useEffect, useState } from "react";
import Image from "next/image";

export const CreateCompletePosterContainer = ({ posterId }: { posterId: string }) => {
  const [posterImageBase64, setPosterImageBase64] = useState<string | null>(null);

  const { data, isLoading } = usePosterStatus({ posterId: Number(posterId) }, { enabled: !!posterId });
  const posterImage = data?.data.posterFile?.fileUrl ?? "";

  useEffect(() => {
    async function getPosterImageBase64() {
      try {
        const imageBase64 = await getPosterImage(posterImage);
        setPosterImageBase64(imageBase64.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (posterImage) {
      getPosterImageBase64();
    }
  }, [posterImage, setPosterImageBase64]);

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
          <div className='mx-auto desktop:max-w-[40rem] max-w-[31.5rem] shadow-[0_4px_18px_rgba(0,0,0,0.15)]'>
            {(!posterImageBase64 || isLoading) && (
              <div className='desktop:h-[50rem] h-[30rem] flex items-center justify-center'>
                <Loading />
              </div>
            )}
            {posterImageBase64 && !isLoading && (
              <Image
                src={posterImageBase64}
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
          <Button variant='outline' className='flex-1' onClick={() => downloadImage(posterImageBase64)}>
            포스터 다운로드
          </Button>
          <Button className='flex-1' onClick={handleFeedCertification}>
            피드 인증하러 가기
          </Button>
        </div>
      </div>
    </div>
  );
};
