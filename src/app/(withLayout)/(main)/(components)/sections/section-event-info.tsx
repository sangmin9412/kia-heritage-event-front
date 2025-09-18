import { SectionTitle } from "@/app/(withLayout)/(main)/(components)/shared/section-title";
import { EVENT_INFO } from "@/config";

export const SectionEventInfo = () => {
  return (
    <section className='bg-white desktop:p-[8rem_0_6rem] p-[4rem_0]'>
      <h3 className='blind'>이벤트 정보 섹션</h3>
      <div className='container'>
        <div className='flex flex-col desktop:gap-[12rem] gap-[6rem] desktop:text-[2rem] text-[1.6rem] leading-[1.5]'>
          <div className='flex flex-col desktop:gap-[4rem] gap-[3rem]'>
            <SectionTitle asChild>
              <h4>이벤트 기간</h4>
            </SectionTitle>
            <div className='flex flex-col gap-[2.4rem]'>
              <div>
                <dl className='flex flex-col desktop:flex-row desktop:gap-[1.6rem] gap-[0.8rem]'>
                  <dt className='desktop:flex-[0_0_18rem] font-bold'>참여 기간</dt>
                  <dd>
                    {EVENT_INFO.info.start} ~ {EVENT_INFO.info.end}
                  </dd>
                </dl>
              </div>
              <div>
                <dl className='flex flex-col desktop:flex-row desktop:gap-[1.6rem] gap-[0.8rem]'>
                  <dt className='desktop:flex-[0_0_18rem] font-bold'>심사 발표</dt>
                  <dd>{EVENT_INFO.info.announcement}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className='flex flex-col desktop:gap-[4rem] gap-[3rem]'>
            <SectionTitle asChild>
              <h4>이벤트 대상</h4>
            </SectionTitle>
            <div>
              <dl className='flex flex-col desktop:flex-row desktop:gap-[1.6rem] gap-[0.8rem]'>
                <dt className='desktop:flex-[0_0_18rem] font-bold'>이벤트 대상</dt>
                <dd>기아와 함께한 순간이 있다면, 누구나 참여 가능</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
