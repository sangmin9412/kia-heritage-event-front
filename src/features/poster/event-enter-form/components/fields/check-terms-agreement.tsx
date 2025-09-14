"use client";

import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { eventEnterFormSchemaType } from "@/features/poster/event-enter-form";
import { Checkbox } from "@/components/ui/checkbox";

export const TermsAgreementField = ({ form }: { form: UseFormReturn<eventEnterFormSchemaType> }) => {
  const allChecked = form.watch("agreeTerms") && form.watch("agreePrivacy");

  return (
    <div className='pb-[3.2rem]'>
      <div className='desktop:mb-[2.4rem] mb-[1.6rem] py-[1.2rem] border-b border-primary'>
        <div className='flex items-center desktop:gap-[1.2rem] gap-[0.6rem]'>
          <Checkbox
            id='agreeAll'
            checked={allChecked}
            onCheckedChange={checked => {
              form.setValue("agreeTerms", Boolean(checked), {
                shouldValidate: true
              });
              form.setValue("agreePrivacy", Boolean(checked), {
                shouldValidate: true
              });
            }}
          />
          <label htmlFor='agreeAll' className={cn("font-bold cursor-pointer")}>
            <p>약관에 모두 동의합니다.</p>
          </label>
        </div>
      </div>

      <div className='flex flex-col desktop:gap-[2.4rem] gap-[1.6rem]'>
        <div>
          <div className='flex items-center desktop:gap-[1.2rem] gap-[0.6rem]'>
            <Checkbox
              id='agreeTerms'
              className={`${form.formState.errors.agreeTerms ? "" : ""}`}
              checked={form.getValues("agreeTerms")}
              onCheckedChange={checked => {
                form.setValue("agreeTerms", Boolean(checked), {
                  shouldValidate: true
                });
              }}
            />
            <label
              htmlFor='agreeTerms'
              className={cn("font-bold cursor-pointer", form.formState.errors.agreeTerms ? "text-destructive" : "")}
            >
              <p>개인정보 수집/이용 동의 (필수)</p>
            </label>
          </div>
          <div className='desktop:mt-[1.2rem] mt-[0.8rem] p-[0_0.8rem_0_1.6rem] desktop:h-[12rem] h-[8rem] desktop:border-[2px] border-[1px] border-border'>
            <div className='desktop:p-[1.6rem_0.8rem_1.6rem_0] p-[1.2rem_0.8rem_1.2rem_0] h-full custom-scrollbar overflow-y-auto'>
              <div className='desktop:text-[1.4rem] text-[1.2rem] desktop:leading-[2.2rem] leading-[2rem] text-sub-text'>
                <p>
                  <strong>[개인정보 수집 및 이용 동의]</strong>
                  <br />
                  ㈜기아는 개인정보보호법 제 15조에 따라 아래와 같이 정보주체의 개인정보를 동의 받아 수집하고 있습니다.
                  <br />
                  <strong>1. 수집 항목</strong>
                  <br />
                  - 이름, 휴대전화번호, 이메일 주소, 성별, 생년월일, 자동차운전면허증 소지 여부, 응모 사진, 응모 사연
                  <br />
                  <strong>2. 수집 및 이용 목적</strong>
                  <br />
                  - 이벤트 응모 접수 및 참가 확인
                  <br />
                  - 이벤트 당첨자 선정, 고지 및 경품 발송
                  <br />
                  - 응모 사진 및 사연의 Kia 공식 채널(공식 홈페이지, 공식 온드미디어 채널, 온·오프라인 홍보물 등) 게시
                  및 홍보 활용
                  <br />
                  <strong>3. 보유 및 이용 기간</strong>
                  <br />
                  - 이벤트 응모 후 Kia 80주년 기념 전시 종료 전까지(2028년 12월 31일까지)
                  <br />
                  <strong>4. 개인정보 제공 받는 자 : 주식회사 이노션에스</strong>
                  <br />
                  ※ 고객님은 위 사항과 관련하여 개인정보 수집 및 이용하는 것에 대해 거부할 수 있습니다.
                  <br />
                  ※ 개인정보 수집 및 이용에 동의하지 않으실 경우 이벤트 당첨이 취소되니 유의 바랍니다.
                  <br />
                  ※ 수집된 정보는 수집 및 이용 목적 외 사용되지 않으며, 이용 목적 달성 후 폐기됩니다.
                  <br />
                  ※ 14세 미만 아동 당첨 및 개인정보 수집 시 법적대리인의 동의가 필요하여 별도 연락 예정입니다.
                  <br />※ 5만원 초과 경품 당첨 시, 제세공과금처리를 위해 소득세법 21조 등에 따라 주민등록번호를
                  개인정보보호법 제24조의2에 근거해 처리할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='flex items-center desktop:gap-[1.2rem] gap-[0.6rem]'>
            <Checkbox
              id='agreePrivacy'
              className={`${form.formState.errors.agreePrivacy ? "" : ""}`}
              checked={form.getValues("agreePrivacy")}
              onCheckedChange={checked => {
                form.setValue("agreePrivacy", Boolean(checked), {
                  shouldValidate: true
                });
              }}
            />
            <label
              htmlFor='agreePrivacy'
              className={cn("font-bold cursor-pointer", form.formState.errors.agreePrivacy ? "text-destructive" : "")}
            >
              <p>개인정보 처리의 위탁 · 제3자 제공 (필수)</p>
            </label>
          </div>
          <div className='desktop:mt-[1.2rem] mt-[0.8rem] p-[0_0.8rem_0_1.6rem] desktop:h-[12rem] h-[8rem] desktop:border-[2px] border-[1px] border-border'>
            <div className='desktop:p-[1.6rem_0.8rem_1.6rem_0] p-[1.2rem_0.8rem_1.2rem_0] h-full custom-scrollbar overflow-y-auto'>
              <div className='desktop:text-[1.4rem] text-[1.2rem] desktop:leading-[2.2rem] leading-[2rem] text-sub-text'>
                <p>
                  <strong>[개인정보 처리의 위탁 및 제3자 제공 동의]</strong>
                  <br />
                  ㈜기아는 원활한 이벤트 운영을 위하여 개인정보 처리 업무를 다음과 같이 위탁 및 제3자에게 제공합니다.
                  <br />
                  <strong>1. 위탁 받는 자 : </strong>주식회사 이노션에스
                  <br />
                  <strong>2. 위탁업무 내용 : </strong>이벤트 운영 대행, 응모 관리, 당첨자 선정 및 고지, 경품 발송 업무
                  <br />
                  <strong>3. 제3자 제공 받는 자 : </strong>주식회사 아이엠폼
                  <br />
                  <strong>4. 제3자 제공 항목 : </strong>이름, 휴대전화번호, 이메일 주소, 성별, 생년월일,
                  자동차운전면허증 소지 여부, 응모 사진, 응모 사연
                  <br />
                  <strong>5. 제3자 제공 목적 : </strong>Kia 창립 80주년 기념 헤리티지 고객 참여 이벤트 홍보(공식
                  홈페이지, 공식 온드미디어 채널, 온·오프라인 홍보물 등) 게시 및 홍보 활용
                  <br />
                  <strong>6. 제3자 보유 및 이용 기간 : </strong>2025년 12월 31일까지
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='desktop:mt-[3.2rem] mt-[1.6rem]'>
        <div className='flex desktop:p-[1.6rem] p-[1.2rem_1.6rem] bg-[#F8F8F8]'>
          <p className='flex-1 desktop:text-[1.4rem] text-[1.2rem] desktop:leading-[2.2rem] leading-[2rem] text-sub-text text-center'>
            참여 시 입력하신 연락처와 이메일 주소로 당첨 안내가 진행됩니다.
            <br className='desktop:block hidden' />
            입력하신 성함과 연락처 정보가 실제와 다를 경우,
            <br className='desktop:block hidden' />
            당첨이 취소될 수 있으니 정확한 정보를 입력해 주세요.
          </p>
        </div>
      </div>
    </div>
  );
};
