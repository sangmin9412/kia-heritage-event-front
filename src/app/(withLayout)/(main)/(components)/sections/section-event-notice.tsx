import { DotItem, DotList } from "@/components/ui/dot-list";

const NOTICE_ITEMS = [
  "본 이벤트는 1인 1회 접수 가능하며, 동일한 개인정보로 중복 응모할 경우, 최초 1건의 응모만 인정됩니다.",
  "본인 확인 및 경품 제공을 위해 응모자의 이름/휴대전화번호/이메일 주소 등의 필수 개인정보를 수집하며, 수상자에 한하여 제세공과금 납부를 위해 주민등록번호 등을 추가 수집할 수 있습니다.",
  "수상자는 2025년 11월 20일 기아닷컴 이벤트 게시판을 통해 공지될 예정입니다.",
  "수상자에게는 발표 이후, 배송을 위한 주소 등이 개인정보 수집을 위해 응모 시 입력한 연락처로 별도의 개별 연락을 진행할 예정이며, 정확하지 않은 정보 입력 및 제공으로 인해 <br />당첨 안내 메시지와 경품을 수신하지 못한 경우, 당사에서 책임지지 않습니다.",
  "응모하는 포스터 사진은 저작권, 초상권 및 개인정보 침해 문제가 없는 본인 촬영 사진이어야 하며, 응모 후 초상권 및 저작권 침해의 문제가 발생해 법적 문제가 발생할 경우, 책임은 응모자에게 있습니다.",
  "14세 미만 아동 당첨 및 개인정보 수집 시 법적대리인의 동의가 필요하여 별도 연락 예정입니다.",
  "주최자는 수상작을 홍보 목적에 한하여 3년간 복제, 전시, 배포, 공중 송신할 수 있고, 입상자와 별도의 합의를 통한 이용 허락을 얻어 2차적 저작물을 작성할 수 있습니다.",
  "응모 이후, 응모한 내역을 번복할 수 없으며 반환되지 않습니다. 위 사항에 동의하지 않는 경우, 공모전 응모가 취소될 수 있습니다.",
  "본 이벤트는 마케팅 활용 및 광고성 정보 수신에 동의하신 고객 대상으로 참여가 가능합니다.",
  "5만 원 초과 경품은 제세공과금(22%)이 발생하며, 당첨자 본인 부담입니다. (제세 처리 및 서류 제출 거부 시 당첨이 취소 될 수 있습니다)",
  "경품 이미지는 실물과 다를 수 있으며, 이벤트 사정에 따라 고객 동의 없이 변경될 수 있습니다.",
  "경품은 양도/양수가 되지 않으며, 타 상품으로 교환 및 환불이 불가합니다.",
  "이벤트 당첨 발표 이후, 안내 3회차 내에 제세공과금 및 배송지 정보 입력 미이행, 최종 유선 연락이 되지 않을 경우 당첨이 취소될 수 있습니다.",
  "비정상적이거나, 불법적인 방법으로 이벤트에 참여하신 경우 당첨이 취소될 수 있습니다.",
  "기아를 비롯한 현대자동차그룹 계열사, 협력사 임직원은 이벤트 참여가 불가합니다.",
  `
  <p>이 이벤트는 기아의 위탁을 받아 ㈜이노션에스가 운영 및 관리하며, ㈜아이엠폼이 개인정보 제3자 제공 및 처리 위탁을 받아 진행합니다.</p>
  <p>- 이벤트 문의 : <a href='mailto:group21team@gmail.com' class="out-link">group21team@gmail.com</a>, 평일 오전 10시 ~ 12시 / 오후 1시 ~ 7시, 주말 및 공휴일 제외</p>
  `
];

export const SectionEventNotice = () => {
  return (
    <div className='desktop:py-[8rem] py-[3rem] border-t border-border'>
      <div className='container'>
        <div className='flex flex-col desktop:gap-[2.4rem] gap-[1.6rem]'>
          <h3 className='desktop:text-[1.8rem] text-[1.6rem] desktop:leading-[3rem] leading-[2.6rem] font-bold text-secondary'>
            유의 사항
          </h3>
          <div>
            <DotList className='desktop:gap-[1.6rem] gap-[0.8rem]'>
              {NOTICE_ITEMS.map(item => (
                <DotItem
                  key={item}
                  className='desktop:pl-[1.6rem] pl-[1.2rem] desktop:text-[1.4rem] text-[1.2rem] desktop:leading-[2.2rem] leading-[2rem] desktop:[--line-height:2.2rem] [--line-height:2rem] text-sub-text'
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </DotList>
          </div>
        </div>
      </div>
    </div>
  );
};
