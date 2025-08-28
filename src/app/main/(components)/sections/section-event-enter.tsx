import { SectionTitle } from "@/app/main/(components)/shared/section-title";
import { DotItem, DotList } from "@/components/ui/dot-list";
import { getImagePath } from "@/lib/utils";
import Image from "next/image";

export const SectionEventEnter = () => {
  return (
    <section className='relative py-[8rem]'>
      <h3 className='blind'>응모 방법 섹션</h3>
      <div aria-hidden='true' className='absolute inset-0 bg-black'>
        <Image
          src={getImagePath("/images/main/enter_section_bg_01.webp")}
          alt='enter section background'
          fill
          className='object-cover'
          unoptimized
        />
      </div>
      <div className='container'>
        <div className='flex flex-col gap-[4rem]'>
          <SectionTitle asChild>
            <h4>응모 방법</h4>
          </SectionTitle>
          <div>
            <div className='flex gap-[4rem]'>
              <div className='flex flex-col flex-1 bg-white'>
                <div className='flex justify-center h-[32rem] bg-border overflow-hidden'>
                  <div className='relative top-[4rem] w-[31rem] h-[38.8rem] shadow-[0_4px_15px_rgba(0,0,0,0.15)]'>
                    <Image
                      src={getImagePath("/images/main/enter_item_img_01.webp")}
                      alt='enter item image'
                      width={310}
                      height={388}
                      unoptimized
                      className='w-full h-full object-contain'
                    />
                  </div>
                </div>

                <div className='p-[3.2rem]'>
                  <p className='mb-[.8rem] text-[1.8rem] leading-[3rem] text-sub-text'>Step 01</p>
                  <h5 className='text-[2.4rem] leading-[3.8rem] font-bold'>나만의 포스터 만들기</h5>
                </div>

                <div className='p-[3.2rem_3.2rem_4rem] border-t border-border'>
                  <DotList>
                    <DotItem>‘나와 Kia’의 특별한 순간이 담긴 사진을 업로드해 주세요.</DotItem>
                    <DotItem>
                      포스터에 들어갈 문구를 입력하고, 마음에 드는 포토 프레임을 골라
                      <br />단 하나뿐인 ‘My moments with Kia’ 포스터를 만들어 보세요!
                    </DotItem>
                  </DotList>
                </div>
              </div>
              <div className='flex flex-col flex-1 bg-white'>
                <div className='flex justify-center h-[32rem] bg-border overflow-hidden'>
                  <div className='relative top-[4rem] w-[26rem] h-[38.2rem] shadow-[0_4px_15px_rgba(0,0,0,0.15)]'>
                    <Image
                      src={getImagePath("/images/main/enter_item_img_02.webp")}
                      alt='enter item image'
                      width={260}
                      height={382}
                      unoptimized
                      className='w-full h-full object-contain'
                    />
                  </div>
                </div>

                <div className='p-[3.2rem]'>
                  <p className='mb-[.8rem] text-[1.8rem] leading-[3rem] text-sub-text'>Step 02</p>
                  <h5 className='text-[2.4rem] leading-[3.8rem] font-bold'>인스타그램 피드 인증하기</h5>
                </div>

                <div className='p-[3.2rem_3.2rem_4rem] border-t border-border'>
                  <DotList>
                    <DotItem>완성된 포스터를 저장한 후, 인스타그램 피드에 인증해주세요.</DotItem>
                    <DotItem>
                      기아 공식 계정(@kia.kor)태그 및 필수 해시태그 입력 필수!
                      <div className='py-[.8rem] flex items-center gap-[.4rem]'>
                        <button className='px-[1.6rem] text-[1.6rem] leading-[3.6rem] border border-border rounded-[3.8rem]'>
                          #기아와함께한순간
                        </button>
                        <button className='px-[1.6rem] text-[1.6rem] leading-[3.6rem] border border-border rounded-[3.8rem]'>
                          #기아헤리티지이벤트
                        </button>
                        <button className='px-[1.6rem] text-[1.6rem] leading-[3.6rem] border border-border rounded-[3.8rem]'>
                          #기아80주년
                        </button>
                      </div>
                    </DotItem>
                    <DotItem>정확한 심사를 위해 이벤트 종료 기간까지 게시글을 유지해주세요.</DotItem>
                  </DotList>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
