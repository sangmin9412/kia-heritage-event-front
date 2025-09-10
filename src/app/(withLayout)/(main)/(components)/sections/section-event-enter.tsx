import { SectionTitle } from "@/app/(withLayout)/(main)/(components)/shared/section-title";
import { DotItem, DotList } from "@/components/ui/dot-list";

export const SectionEventEnter = () => {
  return (
    <section className='relative desktop:py-[8rem] py-[4rem]'>
      <h3 className='blind'>응모 방법 섹션</h3>
      <div className='container'>
        <div className='flex flex-col desktop:gap-[4rem] gap-[3rem]'>
          <SectionTitle asChild>
            <h4>응모 방법</h4>
          </SectionTitle>
          <div>
            <div className='relative flex desktop:flex-row flex-col desktop:gap-[2.4rem] gap-[1.6rem]'>
              <div className='flex flex-col flex-1 bg-white'>
                <div className='desktop:p-[2.4rem_0] p-[1.6rem_0] flex desktop:flex-row flex-row-reverse items-center desktop:justify-start justify-between desktop:gap-[2.4rem]'>
                  <div className='desktop:w-[10rem] w-[6rem] desktop:h-[10rem] h-[6rem] flex items-center justify-center bg-[#f8f8f8] rounded-full'>
                    <svg
                      width='48'
                      height='48'
                      viewBox='0 0 48 48'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='desktop:w-[4.8rem] w-[3.2rem] desktop:h-[4.8rem] h-[3.2rem]'
                    >
                      <path
                        d='M11.4492 32.4619H36.547C37.0645 32.4619 37.4845 32.0419 37.4845 31.5244V7.24219C37.4845 6.72469 37.0645 6.30469 36.547 6.30469H11.4492C10.9317 6.30469 10.5117 6.72469 10.5117 7.24219V31.5244C10.5117 32.0419 10.9317 32.4619 11.4492 32.4619ZM12.3867 8.17969H35.6095V28.3594L28.7695 21.9178C28.4123 21.5813 27.8555 21.5775 27.4936 21.9094L25.5605 23.6813L19.4039 17.28C19.2286 17.0972 18.9867 16.9941 18.7336 16.9922C18.4777 16.9894 18.2377 17.0916 18.0605 17.2716L12.3858 23.0297V8.17969H12.3867ZM12.3867 25.7006L18.7205 19.2731L24.8433 25.6397C25.1958 26.0063 25.777 26.025 26.152 25.6809L28.118 23.8791L35.2402 30.5859H12.3867V25.6997V25.7006Z'
                        fill='#697278'
                      />
                      <path
                        d='M29.558 16.4436C31.4536 16.4436 32.9948 14.9014 32.9948 13.0067C32.9948 11.112 31.4527 9.56982 29.558 9.56982C27.6633 9.56982 26.1211 11.112 26.1211 13.0067C26.1211 14.9014 27.6633 16.4436 29.558 16.4436ZM29.558 11.4448C30.4195 11.4448 31.1198 12.1451 31.1198 13.0067C31.1198 13.8683 30.4195 14.5686 29.558 14.5686C28.6964 14.5686 27.9961 13.8683 27.9961 13.0067C27.9961 12.1451 28.6964 11.4448 29.558 11.4448Z'
                        fill='#697278'
                      />
                      <path
                        d='M41.5692 2.90625C41.5692 2.38875 41.1492 1.96875 40.6317 1.96875H7.37109C6.85359 1.96875 6.43359 2.38875 6.43359 2.90625V45.0938C6.43359 45.6113 6.85359 46.0312 7.37109 46.0312H30.5817C30.6567 46.0312 30.7289 46.0219 30.7992 46.005C30.8705 46.0219 30.9427 46.0312 31.0148 46.0312C31.2586 46.0312 31.4986 45.9356 31.6777 45.7566L41.2683 36.1659C41.4745 35.9587 41.5683 35.6719 41.5345 35.3916C41.5561 35.3128 41.5683 35.2313 41.5683 35.1459L41.5692 2.90625ZM31.9533 42.8306V36.4406H38.3433L31.9533 42.8306ZM39.6942 34.5656H31.0158C30.4983 34.5656 30.0783 34.9856 30.0783 35.5031V44.1562H8.30859V3.84375H39.6942V34.5656Z'
                        fill='#697278'
                      />
                    </svg>
                  </div>
                  <div>
                    <p className='mb-[.8rem] desktop:text-[1.6rem] text-[1.3rem] desktop:leading-[2.6rem] leading-[2rem] text-sub-text'>
                      Step 01
                    </p>
                    <h5 className='desktop:text-[2rem] text-[1.8rem] desktop:leading-[3.2rem] leading-[3rem] font-bold'>
                      나만의 포스터 만들기
                    </h5>
                  </div>
                </div>

                <div className='desktop:p-[2.4rem_0.8rem] p-[1.6rem_0.4rem] border-t border-border'>
                  <DotList className='gap-[1.2rem]'>
                    <DotItem className='desktop:text-[1.6rem] text-[1.4rem] desktop:leading-[2.6rem] leading-[2.2rem] desktop:[--line-height:2.6rem] [--line-height:2.2rem]'>
                      ‘나와 Kia’의 특별한 순간이 담긴 사진을 업로드해 주세요.
                    </DotItem>
                    <DotItem className='desktop:text-[1.6rem] text-[1.4rem] desktop:leading-[2.6rem] leading-[2.2rem] desktop:[--line-height:2.6rem] [--line-height:2.2rem]'>
                      포스터에 들어갈 문구를 입력하고, 마음에 드는 포토 프레임을 골라 단 하나뿐인 ‘My moments with Kia’
                      포스터를 만들어 보세요!
                    </DotItem>
                  </DotList>
                </div>
              </div>

              <div className='desktop:flex-[0_0_6rem] flex-[0_0_3.2rem] flex justify-center items-center'>
                <svg
                  width='32'
                  height='32'
                  viewBox='0 0 32 32'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-[3.2rem] h-[3.2rem] desktop:rotate-0 rotate-90'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M12.0732 25.1599L19.9839 19.12C20.4701 18.7492 20.8641 18.2711 21.1353 17.7231C21.4066 17.1752 21.5477 16.572 21.5477 15.9606C21.5477 15.3492 21.4066 14.746 21.1353 14.198C20.8641 13.65 20.4701 13.1721 19.9839 12.8013L12.0719 6.76123L10.4492 8.85856L18.3599 14.9119C18.5217 15.0347 18.653 15.1932 18.7434 15.3752C18.8338 15.5571 18.8808 15.7575 18.8808 15.9606C18.8808 16.1638 18.8338 16.3641 18.7434 16.5461C18.653 16.728 18.5217 16.8865 18.3599 17.0093L10.4492 23.0626L12.0732 25.1599Z'
                    fill='#05141F'
                  />
                </svg>
              </div>

              <div className='flex flex-col flex-1 bg-white'>
                <div className='desktop:p-[2.4rem_0] p-[1.6rem_0] flex desktop:flex-row flex-row-reverse items-center desktop:justify-start justify-between desktop:gap-[2.4rem]'>
                  <div className='desktop:w-[10rem] w-[6rem] desktop:h-[10rem] h-[6rem] flex items-center justify-center bg-[#f8f8f8] rounded-full'>
                    <svg
                      width='48'
                      height='48'
                      viewBox='0 0 48 48'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='desktop:w-[4.8rem] w-[3.2rem] desktop:h-[4.8rem] h-[3.2rem]'
                    >
                      <path
                        d='M38.8275 1.96875H9.16875C8.40375 1.96875 7.78125 2.59125 7.78125 3.35625V44.6438C7.78125 45.4088 8.40375 46.0312 9.16875 46.0312H38.8266C39.5916 46.0312 40.2141 45.4088 40.2141 44.6438V3.35625C40.2141 2.59125 39.5916 1.96875 38.8266 1.96875H38.8275ZM9.65625 26.7009L17.5734 18.6666L25.1737 26.5697C25.5263 26.9363 26.1075 26.955 26.4825 26.6109L29.0156 24.2897L37.7691 32.5331H9.65625V26.7009ZM38.34 44.1562H9.65625V34.4081H38.3391V44.1562H38.34ZM38.34 30.495L29.6681 22.3284C29.3109 21.9919 28.7541 21.9881 28.3922 22.32L25.8919 24.6112L18.2587 16.6734C18.0834 16.4906 17.8416 16.3875 17.5884 16.3856H17.5828C17.3316 16.3856 17.0916 16.4859 16.9153 16.665L9.65719 24.03V13.7447H38.34V30.4941V30.495ZM38.34 11.8697H9.65625V3.84375H38.3391V11.8697H38.34Z'
                        fill='#697278'
                      />
                      <path
                        d='M19.5586 7.14697H28.3908C28.9083 7.14697 29.3283 6.72697 29.3283 6.20947C29.3283 5.69197 28.9083 5.27197 28.3908 5.27197H19.5586C19.0411 5.27197 18.6211 5.69197 18.6211 6.20947C18.6211 6.72697 19.0411 7.14697 19.5586 7.14697Z'
                        fill='#697278'
                      />
                      <path
                        d='M31.0385 20.5751C32.6866 20.5751 34.0282 19.2345 34.0282 17.5854C34.0282 15.9363 32.6876 14.5957 31.0385 14.5957C29.3895 14.5957 28.0488 15.9363 28.0488 17.5854C28.0488 19.2345 29.3895 20.5751 31.0385 20.5751ZM31.0385 16.4716C31.6526 16.4716 32.1532 16.9713 32.1532 17.5863C32.1532 18.2013 31.6535 18.701 31.0385 18.701C30.4235 18.701 29.9238 18.2013 29.9238 17.5863C29.9238 16.9713 30.4235 16.4716 31.0385 16.4716Z'
                        fill='#697278'
                      />
                    </svg>
                  </div>
                  <div>
                    <p className='mb-[.8rem] desktop:text-[1.6rem] text-[1.3rem] desktop:leading-[2.6rem] leading-[2rem] text-sub-text'>
                      Step 02
                    </p>
                    <h5 className='desktop:text-[2rem] text-[1.8rem] desktop:leading-[3.2rem] leading-[3rem] font-bold'>
                      인스타그램 피드 인증하기
                    </h5>
                  </div>
                </div>

                <div className='desktop:p-[2.4rem_0.8rem] p-[1.6rem_0.4rem] border-t border-border'>
                  <DotList className='gap-[1.2rem]'>
                    <DotItem className='desktop:text-[1.6rem] text-[1.4rem] desktop:leading-[2.6rem] leading-[2.2rem] desktop:[--line-height:2.6rem] [--line-height:2.2rem]'>
                      완성된 포스터를 저장한 후, 인스타그램 피드에 인증해주세요.
                    </DotItem>
                    <DotItem className='desktop:text-[1.6rem] text-[1.4rem] desktop:leading-[2.6rem] leading-[2.2rem] desktop:[--line-height:2.6rem] [--line-height:2.2rem]'>
                      기아 공식 계정(@Kia.kor) 태그 및 필수 해시태그 입력 필수! #기아와함께한순간 #기아헤리티지이벤트
                      #기아80주년
                      <div className='pt-[1.2rem] flex items-center flex-wrap desktop:gap-[.8rem] gap-[.4rem]'>
                        <button className='px-[0.8rem] desktop:text-[1.4rem] text-[1.3rem] desktop:leading-[3.8rem] leading-[3.6rem] bg-[#f8f8f8]'>
                          #기아와함께한순간
                        </button>
                        <button className='px-[0.8rem] desktop:text-[1.4rem] text-[1.3rem] desktop:leading-[3.8rem] leading-[3.6rem] bg-[#f8f8f8]'>
                          #기아헤리티지이벤트
                        </button>
                        <button className='px-[0.8rem] desktop:text-[1.4rem] text-[1.3rem] desktop:leading-[3.8rem] leading-[3.6rem] bg-[#f8f8f8]'>
                          #기아80주년
                        </button>
                      </div>
                    </DotItem>
                    <DotItem className='desktop:text-[1.6rem] text-[1.4rem] desktop:leading-[2.6rem] leading-[2.2rem] desktop:[--line-height:2.6rem] [--line-height:2.2rem]'>
                      정확한 심사를 위해 이벤트 종료 기간까지 게시글을 유지해주세요.
                    </DotItem>
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
