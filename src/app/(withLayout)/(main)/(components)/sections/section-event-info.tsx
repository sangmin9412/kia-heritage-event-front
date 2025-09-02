import { SectionTitle } from "@/app/(withLayout)/(main)/(components)/shared/section-title";
import { EVENT_INFO } from "@/config";

export const SectionEventInfo = () => {
  return (
    <section className='bg-white py-[8rem]'>
      <h3 className='blind'>이벤트 정보 섹션</h3>
      <div className='container'>
        <div className='flex flex-col gap-[16rem] text-[2rem] leading-[3.2rem]'>
          <div className='flex flex-col gap-[4rem]'>
            <SectionTitle asChild>
              <h4>이벤트 기간</h4>
            </SectionTitle>
            <div className='flex flex-col gap-[2.4rem]'>
              <div>
                <dl className='flex gap-[1.6rem]'>
                  <dt className='flex-[0_0_18rem] font-bold'>참여 기간</dt>
                  <dd>
                    {EVENT_INFO.info.start} ~ {EVENT_INFO.info.end}
                  </dd>
                </dl>
              </div>
              <div>
                <dl className='flex gap-[1.6rem]'>
                  <dt className='flex-[0_0_18rem] font-bold'>심사 발표</dt>
                  <dd>{EVENT_INFO.info.announcement}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-[4rem]'>
            <SectionTitle asChild>
              <h4>이벤트 대상</h4>
            </SectionTitle>
            <div>
              <dl className='flex gap-[1.6rem]'>
                <dt className='flex-[0_0_18rem] font-bold'>이벤트 대상</dt>
                <dd>Kia와 함께한 순간이 있다면, 대한민국 국민 누구나 참여 가능</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
