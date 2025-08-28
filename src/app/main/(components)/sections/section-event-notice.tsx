import { DotItem, DotList } from "@/components/ui/dot-list";

const NOTICE_ITEMS = [
  "해당 이벤트는 1인 1회 참여가 가능하며 불법적인 방법으로 응모할 경우 당첨이 취소되며, 추후 이벤트 응모시 제안이 있을 수 있습니다.",
  "이 이벤트는 마케팅 활용 및 광고성 정보 수신에 동의하신 고객 대상으로 참여가 가능합니다.",
  "이벤트 참여시 입력한 성함 및 연락처 등의 정보가 일치하지 않을 경우 당첨에 제한될 수 있습니다.",
  "배송형 경품은 이벤트 참여기간 이후 당첨자 발표일에 기아닷컴을 통해 발표되며, 당첨자에 한하여 배송형 경품은 배송지 수합을 위해 개별 문자 안내 예정입니다.",
  "경품의 경우 고지된 심사 기준에 따라 선정되며, 일부 추첨을 통해 진행될 수 있습니다.",
  "5만원 초과 경품은 제세공과금(22%)이 발생하며, 당첨자 본인 부담입니다. (제세 처리 및 서류 제출 거부시 당첨이 취소될 수 있습니다.)",
  "경품 이미지는 실물과 다를 수 있으며, 이벤트 사정에 따라 고객 동의 없이 변경될 수 있습니다.",
  "경품은 양도/양수가 되지 않으며, 타 상품으로 교환 및 환불이 불가합니다.",
  "이벤트 당첨 발표 이후, 안내 3회차 내에 제세공과금 및 배송지 정보 입력 미이행, 최종 유선 연락이 되지 않을 경우 당첨이 취소될 수 있습니다.",
  "비정상적이거나 불법적인 방법으로 이벤트에 참여하신 경우 당첨이 취소될 수 있습니다.",
  "이 이벤트는 기아의 위탁을 받아 (주)이노션S가 운영 및 관리합니다."
];

export const SectionEventNotice = () => {
  return (
    <div className='py-[8rem] bg-white'>
      <div className='container'>
        <div className='flex flex-col gap-[2.4rem]'>
          <h3 className='text-[1.8rem] leading-[3rem] font-bold text-[#37434B]'>유의 사항</h3>
          <div>
            <DotList className='gap-[1.6rem]'>
              {NOTICE_ITEMS.map(item => (
                <DotItem key={item} className='text-[1.4rem] leading-[2.2rem] [--line-height:2.2rem] text-[#37434B]'>
                  {item}
                </DotItem>
              ))}
            </DotList>
          </div>
        </div>
      </div>
    </div>
  );
};
