import { SectionTitle } from "@/app/main/(components)/shared/section-title";
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
    title: "주제",
    description: () => (
      <DotList>
        <DotItem className='text-[1.6rem] leading-[2.6rem] [--line-height:2.6rem] text-sub-text'>
          이벤트 주제에 잘 부합하는 포스터인지
        </DotItem>
        <DotItem className='text-[1.6rem] leading-[2.6rem] [--line-height:2.6rem] text-sub-text'>
          Kia 창립 80주년 주제에 명확하게 전달하는 메시지가 있는지
        </DotItem>
      </DotList>
    ),
    score: 30
  },
  {
    title: "창의성/독창성",
    description: () => (
      <DotList>
        <DotItem className='text-[1.6rem] leading-[2.6rem] [--line-height:2.6rem] text-sub-text'>
          시각적으로 본인의 스토리가 포스터에 잘 표현 되었는지
        </DotItem>
        <DotItem className='text-[1.6rem] leading-[2.6rem] [--line-height:2.6rem] text-sub-text'>
          독창적으로 제작이 되었는지
        </DotItem>
      </DotList>
    ),
    score: 30
  },
  {
    title: "작품 완성도",
    description: () => (
      <DotList>
        <DotItem className='text-[1.6rem] leading-[2.6rem] [--line-height:2.6rem] text-sub-text'>
          사진의 구도, 타이틀 등 포스터 전체의 이미지의 완성도가 우수한지
        </DotItem>
      </DotList>
    ),
    score: 20
  },
  {
    title: "이벤트 참여도",
    description: () => (
      <DotList>
        <DotItem className='text-[1.6rem] leading-[2.6rem] [--line-height:2.6rem] text-sub-text'>
          포스터 이미지 생성 후 지정 해시태그를 모두 입력 후 SNS 피드에 업로드 했는가
        </DotItem>
        <DotItem className='text-[1.6rem] leading-[2.6rem] [--line-height:2.6rem] text-sub-text'>
          설명글에 캠페인 메시지를 잘 반영했는가
        </DotItem>
      </DotList>
    ),
    score: 20
  }
];

export const SectionEventPrize = () => {
  return (
    <section className='py-[8rem] bg-white'>
      <h3 className='blind'>경품 및 시상 안내 섹션</h3>
      <div className='container'>
        <div className='flex flex-col gap-[4rem]'>
          <SectionTitle asChild>
            <h4>경품 및 시상 안내</h4>
          </SectionTitle>
          <div className='flex flex-col gap-[4rem]'>
            <h5 className='blind'>경품 안내</h5>
            <div className='flex gap-[3.2rem] overflow-hidden'>
              {PRIZE_LIST.map(prize => (
                <div className='flex flex-1 flex-col items-center overflow-hidden' key={prize.title}>
                  <div className='flex justify-center items-center'>
                    <div className='flex w-[40.5rem] h-[30.7rem]'>
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
                  <div className='pt-[2.4rem] text-center flex flex-col gap-[.8rem]'>
                    <p className='text-[2.4rem] leading-[3.8rem] font-bold'>{prize.prizeName}</p>
                    <p className='text-[1.8rem] leading-[3rem] text-sub-text'>{prize.winDescription}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h5 className='text-[1.8rem] leading-[6.2rem] font-bold text-center text-white bg-black'>심사 기준</h5>
              <div>
                {JUDGE_CRITERIA.map(criteria => (
                  <div key={criteria.title} className='flex'>
                    <div className='flex-[0_0_30rem] flex items-center justify-center p-[1.6rem_2.4rem] bg-[#f8f8f8] border-r border-b border-border'>
                      <p className='text-[1.8rem] leading-[3rem] font-bold text-center'>{criteria.title}</p>
                    </div>
                    <div className='flex-1 p-[1.6rem_2.4rem] border-r border-b border-border'>
                      {criteria.description()}
                    </div>
                    <div className='flex-[0_0_12rem] flex items-center justify-center p-[1.6rem_2.4rem] border-b border-border'>
                      <p className='text-[1.6rem] leading-[2.6rem] font-bold text-center'>{criteria.score}</p>
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
