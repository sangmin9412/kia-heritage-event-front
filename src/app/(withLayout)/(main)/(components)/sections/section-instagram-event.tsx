import { getImagePath } from "@/lib/utils";
import Image from "next/image";

export const SectionInstagramEvent = () => {
  return (
    <section className='desktop:pt-[8rem] pt-[2rem] desktop:pb-[4rem] pb-[2rem]'>
      <h3 className='blind'>인스타그램 스토리 공유 이벤트 섹션</h3>
      <div className='container'>
        <div className='flex desktop:flex-row flex-col'>
          <div className='desktop:py-[6.2rem] py-[3.7rem] desktop:flex-[0_0_70rem] flex-auto flex bg-sub-text'>
            <div className='m-auto flex desktop:w-[50rem] w-[25.6rem] aspect-[500/480]'>
              <Image
                src={getImagePath("/images/main/share_item_01.webp")}
                alt='이벤트 공유 이미지'
                width={500}
                height={480}
                unoptimized
                priority
                className='w-full h-full object-contain'
              />
            </div>
          </div>
          <div className='flex-1 desktop:p-[4rem] p-[2.4rem] bg-[#f8f8f8]'>
            <div className='mb-[2.4rem] text-center'>
              <h4 className='mb-[1.2rem] desktop:text-[2rem] text-[1.8rem] desktop:leading-[3.2rem] leading-[3rem] font-bold'>
                추가 이벤트 안내
                <br />
                인스타그램 스토리 공유 이벤트!
              </h4>
              <p className='text-secondary'>
                완성된 포스터를 저장한 후,
                <br />
                인스타그램 스토리에 업로드해 인증해보세요!
              </p>
            </div>
            <div className='p-[2.4rem] bg-white'>
              <div>
                <ol className='flex flex-col desktop:gap-[7.2rem] gap-[5.6rem] [counter-reset:step] [counter-increment:step]'>
                  <li className='relative desktop:pl-[2.7rem] before:content-["0"counter(step)] before:font-bold flex gap-[.8rem] justify-center desktop:text-center'>
                    <p>완성된 포스터를 다운로드 해 주세요.</p>
                    <span
                      className='absolute left-0 right-0 top-full desktop:pt-[2.4rem] pt-[1.6rem] flex justify-center'
                      aria-hidden='true'
                    >
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-[2.4rem] h-[2.4rem]'
                      >
                        <rect x='24' width='24' height='24' rx='12' transform='rotate(90 24 0)' fill='#05141F' />
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M6.84801 9.79047L10.2455 14.2402C10.4541 14.5137 10.723 14.7353 11.0312 14.8879C11.3394 15.0405 11.6787 15.1198 12.0226 15.1198C12.3665 15.1198 12.7058 15.0405 13.0141 14.8879C13.3223 14.7353 13.5912 14.5137 13.7997 14.2402L17.1973 9.78969L16.0175 8.87695L12.6125 13.3267C12.5435 13.4177 12.4543 13.4916 12.3519 13.5424C12.2496 13.5933 12.1369 13.6197 12.0226 13.6197C11.9083 13.6197 11.7956 13.5933 11.6933 13.5424C11.591 13.4916 11.5018 13.4177 11.4327 13.3267L8.02776 8.87695L6.84801 9.79047Z'
                          fill='white'
                        />
                      </svg>
                    </span>
                  </li>
                  <li className='relative desktop:pl-[2.7rem] [counter-increment:step] before:content-["0"counter(step)] before:font-bold flex gap-[.8rem] justify-center desktop:text-center'>
                    <p>
                      인스타그램 스토리에 포스터를 업로드하고,
                      <br className='hidden desktop:block' />
                      ‘Kia 80주년 지피 스티커’를 붙여 꾸며보세요.
                    </p>
                    <span
                      className='absolute left-0 right-0 top-full desktop:pt-[2.4rem] pt-[1.6rem] flex justify-center'
                      aria-hidden='true'
                    >
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-[2.4rem] h-[2.4rem]'
                      >
                        <rect x='24' width='24' height='24' rx='12' transform='rotate(90 24 0)' fill='#05141F' />
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M6.84801 9.79047L10.2455 14.2402C10.4541 14.5137 10.723 14.7353 11.0312 14.8879C11.3394 15.0405 11.6787 15.1198 12.0226 15.1198C12.3665 15.1198 12.7058 15.0405 13.0141 14.8879C13.3223 14.7353 13.5912 14.5137 13.7997 14.2402L17.1973 9.78969L16.0175 8.87695L12.6125 13.3267C12.5435 13.4177 12.4543 13.4916 12.3519 13.5424C12.2496 13.5933 12.1369 13.6197 12.0226 13.6197C11.9083 13.6197 11.7956 13.5933 11.6933 13.5424C11.591 13.4916 11.5018 13.4177 11.4327 13.3267L8.02776 8.87695L6.84801 9.79047Z'
                          fill='white'
                        />
                      </svg>
                    </span>
                  </li>
                  <li className='relative desktop:pl-[2.7rem] [counter-increment:step] before:content-["0"counter(step)] before:font-bold flex gap-[.8rem] justify-center desktop:text-center'>
                    <p>
                      업로드 시, 기아 공식 인스타그램 계정(@kia.kor)을
                      <br className='hidden desktop:block' />꼭 태그해 주세요!
                    </p>
                  </li>
                </ol>
              </div>
            </div>
            <div className='mt-[2.4rem] text-center'>
              <p>
                참여하신 분들께 추첨을 통해
                <br className='block desktop:hidden' /> <strong>커피쿠폰 (1매)</strong>를 드립니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
