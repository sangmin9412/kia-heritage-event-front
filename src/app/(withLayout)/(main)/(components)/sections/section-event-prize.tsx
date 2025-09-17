import { SectionTitle } from "@/app/(withLayout)/(main)/(components)/shared/section-title";
import { DotItem, DotList } from "@/components/ui/dot-list";
import { cn, getImagePath } from "@/lib/utils";
import Image from "next/image";

const PRIZE_LIST = [
  {
    title: "1등",
    description: "1등 경품",
    prizeName: "The Kia EV4 스탠다드 A/T",
    prizeImage: "/images/main/prize_item_01.webp",
    prizeImageMobile: "/images/main/prize_item_01.webp",
    winCount: 1,
    winDescription: "1명"
  },
  {
    title: "2등",
    description: "2등 경품",
    prizeName: "해비치 숙박권",
    prizeImage: "/images/main/prize_item_02.webp",
    prizeImageMobile: "/images/main/prize_item_02_mobile.webp",
    winCount: 5,
    winDescription: "5명"
  },
  {
    title: "3등",
    description: "3등 경품",
    prizeName: "기아 헤리티지 굿즈",
    prizeImage: "/images/main/prize_item_03.webp",
    prizeImageMobile: "/images/main/prize_item_03_mobile.webp",
    winCount: 20,
    winDescription: "20명"
  }
];

const JUDGE_CRITERIA = [
  {
    title: "주제<br class='desktop:hidden' /> 적합성",
    description: () => (
      <DotList className='gap-0'>
        <DotItem className='desktop:text-[1.6rem] text-[1.3rem] desktop:leading-[2.6rem] leading-[2rem] desktop:[--line-height:2.6rem] [--line-height:2rem]'>
          이벤트 주제에 잘 부합하는 포스터인가
        </DotItem>
        <DotItem className='desktop:text-[1.6rem] text-[1.3rem] desktop:leading-[2.6rem] leading-[2rem] desktop:[--line-height:2.6rem] [--line-height:2rem]'>
          Kia 창립 80주년 주제에 명확하게 전달하는 메시지가 있는가
        </DotItem>
      </DotList>
    ),
    score: 30
  },
  {
    title: "창의성/<br class='desktop:hidden' />독창성",
    description: () => (
      <DotList className='gap-0'>
        <DotItem className='desktop:text-[1.6rem] text-[1.3rem] desktop:leading-[2.6rem] leading-[2rem] desktop:[--line-height:2.6rem] [--line-height:2rem]'>
          시각적으로 본인의 스토리가 포스터에 잘 표현 되었는가
        </DotItem>
        <DotItem className='desktop:text-[1.6rem] text-[1.3rem] desktop:leading-[2.6rem] leading-[2rem] desktop:[--line-height:2.6rem] [--line-height:2rem]'>
          독창적으로 제작이 되었는가
        </DotItem>
      </DotList>
    ),
    score: 30
  },
  {
    title: "작품<br class='desktop:hidden' /> 완성도",
    description: () => (
      <DotList className='gap-0'>
        <DotItem className='desktop:text-[1.6rem] text-[1.3rem] desktop:leading-[2.6rem] leading-[2rem] desktop:[--line-height:2.6rem] [--line-height:2rem]'>
          사진의 구도, 타이틀 등 포스터 전체의 이미지의 완성도가 우수한가
        </DotItem>
      </DotList>
    ),
    score: 20
  },
  {
    title: "이벤트<br class='desktop:hidden' /> 참여도",
    description: () => (
      <DotList className='gap-0'>
        <DotItem className='desktop:text-[1.6rem] text-[1.3rem] desktop:leading-[2.6rem] leading-[2rem] desktop:[--line-height:2.6rem] [--line-height:2rem]'>
          포스터 이미지 생성 후 지정 해시태그를 모두 입력 후 SNS 피드에 업로드 했는가
        </DotItem>
        <DotItem className='desktop:text-[1.6rem] text-[1.3rem] desktop:leading-[2.6rem] leading-[2rem] desktop:[--line-height:2.6rem] [--line-height:2rem]'>
          설명글에 캠페인 메시지를 잘 반영했는가
        </DotItem>
      </DotList>
    ),
    score: 20
  }
];

export const SectionEventPrize = () => {
  return (
    <section className='desktop:py-[6rem] py-[4rem] bg-white'>
      <h3 className='blind'>경품 및 시상 안내 섹션</h3>
      <div className='container'>
        <div className='flex flex-col desktop:gap-[4rem] gap-[3rem]'>
          <SectionTitle asChild>
            <h4>경품 및 시상 안내</h4>
          </SectionTitle>
          <div className='flex flex-col desktop:gap-[4rem] gap-[3rem]'>
            <h5 className='blind'>경품 안내</h5>
            <div>
              <div className='flex flex-wrap desktop:gap-[2.4rem] gap-[0_0.8rem] overflow-hidden'>
                {PRIZE_LIST.map((prize, index) => (
                  <div
                    className={cn(
                      "relative flex flex-col desktop:p-[6.4rem_2.4rem_2.4rem] p-[4.8rem_0_1.6rem] border-t-[1px] border-border overflow-hidden",
                      index === 0 ? "desktop:flex-1 flex-[0_0_100%]" : "desktop:flex-1 flex-[0_0_calc(50%-0.4rem)]"
                    )}
                    key={prize.title}
                  >
                    <div className='absolute top-0 desktop:left-[2.4rem] left-[0.8rem] desktop:px-[1.8rem] px-[1.4rem] desktop:text-[1.8rem] text-[1.4rem] desktop:leading-[4.2rem] leading-[3.4rem] font-bold text-white rounded-[0_0_1rem_1rem] bg-black'>
                      <span>{prize.title}</span>
                    </div>
                    <div className='flex justify-center items-center w-full'>
                      <div
                        className={cn(
                          "relative flex desktop:w-[36.3rem] w-full aspect-[363/180]",
                          index !== 0 && "aspect-[154/120]"
                        )}
                      >
                        <Image
                          src={getImagePath(prize.prizeImage)}
                          alt={prize.title}
                          width={363}
                          height={180}
                          unoptimized
                          className='hidden desktop:block w-full h-full object-contain'
                        />
                        <Image
                          src={getImagePath(prize.prizeImageMobile)}
                          alt={prize.title}
                          unoptimized
                          fill
                          className='block desktop:hidden w-full h-full object-contain'
                        />
                      </div>
                    </div>
                    <div className='pt-[1.6rem] text-center flex flex-col desktop:gap-[.4rem]'>
                      <p
                        className={cn(
                          "desktop:text-[2rem] text-[1.8rem] desktop:leading-[3.2rem] leading-[3rem] font-bold",
                          index !== 0 && "text-[1.6rem]"
                        )}
                      >
                        {prize.prizeName}
                      </p>
                      <p className='desktop:text-[1.6rem] text-[1.4rem] desktop:leading-[2.6rem] leading-[2.2rem] text-sub-text'>
                        {prize.winDescription}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex flex-col gap-[.4rem] p-[1.6rem_2.4rem] bg-[#f8f8f8]'>
                <p className='desktop:text-[1.4rem] text-[1.2rem] desktop:leading-[2.2rem] leading-[2rem] text-sub-text'>
                  ※ 5만 원 초과 경품은 제세공과금(22%)이 발생하며, 당첨자 본인 부담입니다.
                </p>
                <p className='desktop:text-[1.4rem] text-[1.2rem] desktop:leading-[2.2rem] leading-[2rem] text-sub-text'>
                  ※ 경품 이미지는 실물과 다를 수 있으며, 이벤트 사정에 따라 고객 동의 없이 변경될 수 있습니다.
                </p>
              </div>
            </div>

            <div>
              <h5 className='desktop:text-[1.8rem] text-[1.3rem] desktop:leading-[6.2rem] leading-[4.4rem] font-bold text-center text-white bg-black'>
                심사 기준
              </h5>
              <div>
                {JUDGE_CRITERIA.map(criteria => (
                  <div key={criteria.title} className='flex'>
                    <div className='desktop:flex-[0_0_30rem] flex-[0_0_8rem] flex items-center justify-center desktop:p-[2.4rem] p-[1.2rem] bg-[#f8f8f8] border-r border-b border-border'>
                      <p
                        className='desktop:text-[1.6rem] text-[1.3rem] desktop:leading-[2.6rem] leading-[2rem] font-bold text-center'
                        dangerouslySetInnerHTML={{ __html: criteria.title }}
                      />
                    </div>
                    <div className='flex-1 desktop:p-[2.4rem] p-[1.2rem] border-r border-b border-border'>
                      {criteria.description()}
                    </div>
                    <div className='desktop:flex-[0_0_12rem] flex-[0_0_5rem] flex items-center justify-center desktop:p-[2.4rem] p-[1.2rem] border-b border-border'>
                      <p className='desktop:text-[1.6rem] text-[1.3rem] desktop:leading-[2.6rem] leading-[2rem] font-bold text-center'>
                        {criteria.score}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
