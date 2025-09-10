"use client";

import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { Textarea } from "@/components/ui/textarea";
import { ROUTES } from "@/config";
import { getPosterScreenshot } from "@/features/poster/api";
import { createPosterFormSchemaType } from "@/features/poster/create-poster-form";
import { PosterPreviewer } from "@/features/poster/create-poster-form/components/form/poster-preview";
import { useEventEnterFormStore } from "@/features/poster/store";
import { ANALYTICS_HANDLER, Event } from "@/lib/analytics";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";

export const CreateSubmitContainer = () => {
  const router = useRouter();

  const userStory = useEventEnterFormStore(state => state.userStory);
  const userForm = useEventEnterFormStore(state => state.userForm);
  const posterForm = useEventEnterFormStore(state => state.posterForm) as createPosterFormSchemaType;
  const setPosterImage = useEventEnterFormStore(state => state.setPosterImage);

  const [submitState, setSubmitState] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false
  });

  const onSubmit = async () => {
    try {
      setSubmitState(prev => ({ ...prev, isSubmitting: true }));

      console.log("userForm", userForm);
      console.log("posterForm", posterForm);
      console.log("userStory", userStory);

      // const response = await createPoster({
      //   ...(userForm as eventEnterFormSchemaType),
      //   ...(posterForm as createPosterFormSchemaType),
      //   userStory
      // });

      const response = await getPosterScreenshot({
        frameType: posterForm.frameType,
        imageBase64: "",
        imageScale: posterForm.imageScale,
        imageVertical: posterForm.imageVertical,
        imageHorizontal: posterForm.imageHorizontal,
        carType: posterForm.carType,
        posterTitle: posterForm.posterTitle,
        instagramName: posterForm.instagramName
      });

      setPosterImage(response as string);

      ANALYTICS_HANDLER[Event.BTN_CLICK_CREATE].event();
      router.push(ROUTES.CREATE_COMPLETE_POSTER.link.replace(":posterId", "1234567890"));
    } catch (error) {
      console.error(error);
      setSubmitState(prev => ({ ...prev, isError: true, isSubmitting: false }));
    }
  };

  if (submitState.isSubmitting) {
    return (
      <div className='desktop:mt-[8rem] desktop:mb-[22rem] mt-0 mb-[12rem] desktop:mx-auto mx-auto desktop:p-[8rem_2rem_12rem] p-[4rem_1rem_6rem] desktop:max-w-[86rem] flex flex-col items-center text-center bg-white desktop:shadow-[0_4px_15px_rgba(0,0,0,0.15)]'>
        <div className='desktop:mb-[4rem] mb-0 w-[65%]'>
          <Loading />
        </div>
        <div className='flex flex-col desktop:gap-[1.6rem] gap-[1.2rem]'>
          <p className='desktop:text-[2.4rem] text-[1.8rem] desktop:leading-[3.8rem] leading-[3rem] font-bold'>
            기아와 함께한 추억이 담긴 포스터를
            <br className='desktop:hidden block' /> 생성하고 있어요!
            <br />
            나만의 포스터가 곧 완성됩니다.
          </p>
          <p className='desktop:text-[1.8rem] text-[1.4rem] desktop:leading-[3rem] leading-[2.2rem] text-secondary'>
            포스터 생성 중에는 페이지를 닫거나 이동하지 마세요.
            <br />
            페이지 이탈시 이벤트 참여가 완료되지 않습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='container desktop:px-[3rem] px-0'>
      <div className='flex desktop:flex-row flex-col desktop:pb-[8rem]'>
        <div className='desktop:p-[4.8rem_4rem_0] p-[4.8rem_0] desktop:flex-[0_0_64rem] flex-[0_0_auto] max-w-[64rem] desktop:bg-transparent bg-[#f8f8f8]'>
          <div className='desktop:sticky desktop:top-[2rem]'>
            <div className='animate-in fade-in desktop:slide-in-from-left-10 desktop:slide-in-from-bottom-0 slide-in-from-bottom-10 ease-in-out duration-1000'>
              <div>
                <div className='flex flex-col'>
                  <div className='desktop:w-auto w-[31.5rem] desktop:mx-0 mx-auto bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)]'>
                    <div className='desktop:h-[70rem] h-[39.4rem]'>
                      <PosterPreviewer className='origin-top-left desktop:scale-[0.5185185185185185] scale-[0.2916666666666667]' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-1 min-w-0 w-full'>
          <div className='bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)] animate-in fade-in desktop:slide-in-from-right-10 desktop:slide-in-from-bottom-0 slide-in-from-bottom-10 ease-in-out duration-1000'>
            <CreateSubmitForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CreateSubmitForm = memo(({ onSubmit }: { onSubmit: () => void }) => {
  const router = useRouter();

  const userStory = useEventEnterFormStore(state => state.userStory);
  const setUserStory = useEventEnterFormStore(state => state.setUserStory);

  const setUserStoryHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserStory(e.target.value.slice(0, 300));
  };

  const userStoryLength = userStory.length;
  const limitLength = 300;
  const userStoryLengthString = userStoryLength.toString().padStart(2, "0");
  const placeholderText = `사연을 작성해 주세요.${"\n" /* 또는 &#13;&#10; */}(최대 300자 이내)`;

  return (
    <div className='desktop:min-h-screen flex flex-col'>
      <div className='desktop:p-[2.4rem_4.8rem] p-[3rem]'>
        <div className='desktop:p-[5.6rem_0_0] p-[0_0_4.8rem]'>
          <div className='desktop:mb-[4.8rem] mb-[2.4rem] desktop:pb-0 pb-[2.4rem] desktop:border-b-0 border-b border-border'>
            <h3 className='desktop:text-[2.4rem] text-[1.8rem] desktop:leading-[3.8rem] leading-[3rem] font-bold text-center'>
              포스터에 담긴 Kia와 함께한 시간 속에서
              <br className='desktop:hidden block' /> 느꼈던
              <br className='desktop:block hidden' />
              여러분의 추억을 들려주세요.
            </h3>
          </div>
          <div>
            <h4 className='desktop:pb-[1.2rem] desktop:text-[2rem] desktop:leading-[3.2rem] font-bold desktop:border-b border-primary text-[1.6rem] leading-[2.6rem]'>
              사연 작성하기
            </h4>
            <div className='relative desktop:pt-[3.2rem] pt-[1.6rem]'>
              <div className='desktop:p-[1.6rem_2.4rem_4.8rem_2.4rem] p-[1.6rem_1.6rem_4.8rem] desktop:h-[24rem] h-[20rem] border border-border focus-within:border-primary'>
                <Textarea
                  placeholder={placeholderText}
                  className='p-0 h-full border-0 bg-none shadow-none desktop:text-[1.6rem] text-[1.4rem] desktop:leading-[2.6rem] leading-[2.2rem] resize-none'
                  value={userStory}
                  onChange={setUserStoryHandler}
                />
              </div>
              <span className='absolute desktop:right-[2.4rem] desktop:bottom-[1.6rem] right-[1.6rem] bottom-[1.6rem] desktop:text-[1.4rem] text-[1.2rem] desktop:leading-[2.2rem] leading-[2rem] text-sub-text'>
                {userStoryLengthString}/{limitLength} byte
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-auto sticky bottom-0 flex desktop:gap-[1.6rem] gap-[1.2rem] desktop:p-[2.4rem_4.8rem] p-[1.6rem] bg-white border-t border-border'>
        <Button variant='outline' className='flex-1' onClick={() => router.push(ROUTES.CREATE_FORM.link)}>
          이전으로
        </Button>
        <Button className='flex-1' disabled={userStoryLength === 0} onClick={onSubmit}>
          제출하기
        </Button>
      </div>
    </div>
  );
});
CreateSubmitForm.displayName = "CreateSubmitForm";
