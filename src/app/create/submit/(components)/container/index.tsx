"use client";

import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { Textarea } from "@/components/ui/textarea";
import { ROUTES } from "@/config";
import { createPoster } from "@/features/poster/api";
import { createPosterFormSchemaType } from "@/features/poster/components/create-poster-form";
import { PosterPreviewer } from "@/features/poster/components/create-poster-form/form/poster-preview";
import { eventEnterFormSchemaType } from "@/features/poster/components/event-enter-form";
import { useEventEnterFormStore } from "@/features/poster/store";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";

export const CreateSubmitContainer = () => {
  const router = useRouter();

  const userStory = useEventEnterFormStore(state => state.userStory);
  const userForm = useEventEnterFormStore(state => state.userForm);
  const posterForm = useEventEnterFormStore(state => state.posterForm);

  const [submitState, setSubmitState] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false
  });

  const onSubmit = async () => {
    try {
      setSubmitState(prev => ({ ...prev, isLoading: true }));

      console.log("userForm", userForm);
      console.log("posterForm", posterForm);
      console.log("userStory", userStory);

      const response = await createPoster({
        ...(userForm as eventEnterFormSchemaType),
        ...(posterForm as createPosterFormSchemaType),
        userStory
      });

      router.push(ROUTES.CREATE_COMPLETE_POSTER.link.replace(":posterId", response.posterId));

      console.log("response", response);
    } catch (error) {
      console.error(error);
      setSubmitState(prev => ({ ...prev, isError: true }));
    } finally {
      setSubmitState(prev => ({ ...prev, isLoading: false }));
    }
  };

  if (submitState.isLoading) {
    return (
      <div className='mt-[8rem] mb-[22rem] mx-auto p-[8rem_2rem_12rem] max-w-[86rem] flex flex-col items-center text-center bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)]'>
        <div className='mb-[4rem]'>
          <Loading />
        </div>
        <div className='flex flex-col gap-[1.6rem]'>
          <p className='text-[2.4rem] leading-[3.8rem] font-bold'>
            기아와 함께한 추억이 담긴 포스터를 생성하고 있어요!
            <br />
            나만의 포스터가 곧 완성됩니다.
          </p>
          <p className='text-[1.8rem] leading-[3rem] text-secondary'>
            포스터 생성 중에는 페이지를 닫거나 이동하지 마세요.
            <br />
            페이지 이탈시 이벤트 참여가 완료되지 않습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='flex pb-[8rem]'>
        <div className='p-[4.8rem_4rem_0] flex-[0_0_64rem] max-w-[64rem]'>
          <div className='sticky top-[2rem]'>
            <div className='animate-in fade-in slide-in-from-left-10 ease-in-out duration-1000'>
              <div>
                <div className='flex flex-col'>
                  <div className='bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)]'>
                    <div className='h-[70rem]'>
                      <PosterPreviewer className='origin-top-left scale-[0.5185185185185185]' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-1 min-w-0 w-full'>
          <div className='min-h-screen flex flex-col bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)] animate-in fade-in slide-in-from-right-10 ease-in-out duration-1000'>
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
    <>
      <div className='p-[2.4rem_4.8rem]'>
        <div className='pt-[5.6rem]'>
          <div className='mb-[4.8rem]'>
            <h3 className='text-[2.4rem] leading-[3.8rem] font-bold text-center'>
              포스터에 담긴 Kia와 함께한 시간 속에서 느꼈던
              <br />
              여러분의 추억을 들려주세요.
            </h3>
          </div>
          <div>
            <h4 className='pb-[1.2rem] text-[2rem] leading-[3.2rem] font-bold border-b border-primary'>
              사연 작성하기
            </h4>
            <div className='relative pt-[3.2rem]'>
              <div className='p-[1.6rem_2.4rem_4.8rem_2.4rem] h-[24rem] border border-border focus-within:border-primary'>
                <Textarea
                  placeholder={placeholderText}
                  className='p-0 h-full border-0 bg-none shadow-none text-[1.6rem] leading-[2.6rem] resize-none'
                  value={userStory}
                  onChange={setUserStoryHandler}
                />
              </div>
              <span className='absolute right-[2.4rem] bottom-[1.6rem] text-[1.4rem] leading-[2.2rem] text-sub-text'>
                {userStoryLengthString}/{limitLength} byte
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-auto sticky bottom-0 p-[2.4rem_4.8rem] flex gap-[1.6rem] bg-white border-t border-border'>
        <Button variant='outline' className='flex-1' onClick={() => router.push(ROUTES.CREATE_FORM.link)}>
          이전으로
        </Button>
        <Button className='flex-1' disabled={userStoryLength === 0} onClick={onSubmit}>
          제출하기
        </Button>
      </div>
    </>
  );
});
CreateSubmitForm.displayName = "CreateSubmitForm";
