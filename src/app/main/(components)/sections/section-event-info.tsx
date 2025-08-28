import { SectionTitle } from "@/app/main/(components)/shared/section-title";
import { EVENT_INFO } from "@/config";

export const SectionEventInfo = () => {
  return (
    <section className='bg-white py-[8rem]'>
      <h3 className='blind'>이벤트 정보 섹션</h3>
      <div className='container'>
        <div className='flex flex-col gap-[8rem] text-[2.4rem] leading-[3.8rem]'>
          <div className='flex flex-col gap-[4rem]'>
            <SectionTitle asChild>
              <h4>이벤트 안내</h4>
            </SectionTitle>
            <div className='flex flex-col gap-[3.2rem]'>
              <div>
                <dl className='flex flex-col gap-[.8rem]'>
                  <dt className='font-bold'>참여 기간</dt>
                  <dd>
                    {EVENT_INFO.info.start} ~ {EVENT_INFO.info.end}
                  </dd>
                </dl>
              </div>
              <div>
                <dl className='flex flex-col gap-[.8rem]'>
                  <dt className='font-bold'>심사 발표</dt>
                  <dd>{EVENT_INFO.info.announcement}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-[4rem]'>
            <SectionTitle asChild>
              <h4>이벤트 안내</h4>
            </SectionTitle>
            <div>
              <p>Kia와 함께한 순간이 있다면, 대한민국 국민 누구나 참여 가능</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
