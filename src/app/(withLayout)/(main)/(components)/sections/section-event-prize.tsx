import { SectionTitle } from "@/app/(withLayout)/(main)/(components)/shared/section-title";
import { DotItem, DotList } from "@/components/ui/dot-list";
import { getImagePath } from "@/lib/utils";
import Image from "next/image";

const PRIZE_LIST = [
  {
    title: "1등",
    description: "1등 경품",
    prizeName: "EV 4 에 스탠다드 A/T",
    prizeImage: "/images/main/prize_item_01.webp",
    winCount: 1,
    winDescription: "1명"
  },
  {
    title: "2등",
    description: "2등 경품",
    prizeName: "해비치 숙박권",
    prizeImage: "/images/main/prize_item_02.webp",
    winCount: 2,
    winDescription: "5명"
  },
  {
    title: "3등",
    description: "3등 경품",
    prizeName: "미정",
    prizeImage: "/images/main/prize_item_03.webp",
    winCount: null,
    winDescription: "N명"
  }
];

const JUDGE_CRITERIA = [
  {
    title: "주제<br class='desktop:hidden' /> 적합성",
    description: () => (
      <DotList className='gap-0'>
        <DotItem className='desktop:text-[1.6rem] text-[1.3rem] desktop:leading-[2.6rem] leading-[2rem] desktop:[--line-height:2.6rem] [--line-height:2rem]'>
          이벤트 주제에 잘 부합하는 포스터인지
        </DotItem>
        <DotItem className='desktop:text-[1.6rem] text-[1.3rem] desktop:leading-[2.6rem] leading-[2rem] desktop:[--line-height:2.6rem] [--line-height:2rem]'>
          Kia 창립 80주년 주제에 명확하게 전달하는 메시지가 있는지
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
          시각적으로 본인의 스토리가 포스터에 잘 표현 되었는지
        </DotItem>
        <DotItem className='desktop:text-[1.6rem] text-[1.3rem] desktop:leading-[2.6rem] leading-[2rem] desktop:[--line-height:2.6rem] [--line-height:2rem]'>
          독창적으로 제작이 되었는지
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
          사진의 구도, 타이틀 등 포스터 전체의 이미지의 완성도가 우수한지
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
    <section className='desktop:py-[8rem] py-[4rem] bg-white'>
      <h3 className='blind'>경품 및 시상 안내 섹션</h3>
      <div className='container'>
        <div className='flex flex-col desktop:gap-[4rem] gap-[3rem]'>
          <SectionTitle asChild>
            <h4>경품 및 시상 안내</h4>
          </SectionTitle>
          <div className='flex flex-col desktop:gap-[6.4rem] gap-[3rem]'>
            <h5 className='blind'>경품 안내</h5>
            <div className='flex desktop:flex-row flex-col desktop:gap-[3.2rem] gap-[2.4rem] overflow-hidden'>
              {PRIZE_LIST.map(prize => (
                <div className='flex flex-1 flex-col items-center overflow-hidden' key={prize.title}>
                  <div className='flex justify-center items-center'>
                    <div className='flex desktop:w-[40.5rem] w-full aspect-[405/307]'>
                      <Image
                        src={getImagePath(prize.prizeImage)}
                        alt={prize.title}
                        width={405}
                        height={307}
                        unoptimized
                        className='w-full h-full object-contain'
                      />
                    </div>
                  </div>
                  <div className='pt-[1.6rem] text-center flex flex-col desktop:gap-[.4rem]'>
                    <p className='desktop:text-[2rem] text-[1.8rem] desktop:leading-[3.2rem] leading-[3rem] font-bold'>
                      {prize.prizeName}
                    </p>
                    <p className='desktop:text-[1.6rem] text-[1.4rem] desktop:leading-[2.6rem] leading-[2.2rem] text-sub-text'>
                      {prize.winDescription}
                    </p>
                  </div>
                </div>
              ))}
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
                    <div className='desktop:p-[2.4rem] p-[1.2rem] border-r border-b border-border'>
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
