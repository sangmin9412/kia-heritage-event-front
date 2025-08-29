"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PosterPreviewer } from "@/features/poster/components/create-poster-form/form/poster-preview";
import { useEventEnterFormStore } from "@/features/poster/store";
import { useRouter } from "next/navigation";

export const CreateSubmitContainer = () => {
  const router = useRouter();
  const { userStory, setUserStory, userForm, posterForm } = useEventEnterFormStore(state => state);

  const setUserStoryHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserStory(e.target.value.slice(0, 300));
  };

  const submitHandler = () => {
    console.log("userForm", userForm);
    console.log("posterForm", posterForm);
    console.log("userStory", userStory);
  };

  const userStoryLength = userStory.length;
  const limitLength = 300;
  const userStoryLengthString = userStoryLength.toString().padStart(2, "0");
  const placeholderText = `사연을 작성해 주세요.${"\n" /* 또는 &#13;&#10; */}(최대 300자 이내)`;

  return (
    <div className='pb-[8rem]'>
      <div className='mx-auto max-w-[82rem]'>
        <div className='p-[8rem_4.8rem_4.8rem] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)] animate-in fade-in slide-in-from-bottom-10 ease-in-out duration-1000'>
          <div className='pb-[4.8rem]'>
            <div className='mb-[4.8rem] text-center'>
              <h3 className='text-[2.4rem] leading-[3.8rem] font-bold'>‘My moments with Kia’ 포스터가 완성되었어요!</h3>
              <p className='mt-[.4rem] text-[1.8rem] leading-[3rem] text-sub-text'>
                포스터에 담긴 Kia와 함께한 특별한 추억을 들려주세요.
              </p>
            </div>
            <div>
              <div className='mx-auto w-[43rem] h-[53.8rem] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)] overflow-hidden'>
                <PosterPreviewer className='origin-top-left scale-[0.39814814814814814]' />
              </div>
            </div>
          </div>

          <div className='mt-[2.4rem] pt-[2.4rem] border-t border-border'>
            <div className='pt-[3.8rem]'>
              <h3 className='mb-[1.4rem] text-[2rem] leading-[3.2rem] font-bold text-center'>사연 작성하기</h3>
              <div className='relative'>
                <div className='p-[2.4rem_3.2rem_5.8rem_3.2rem] h-[24rem] border-0 border-t border-black bg-[#f8f8f8]'>
                  <Textarea
                    placeholder={placeholderText}
                    className='p-0 h-full border-0 bg-none shadow-none text-[1.6rem] leading-[2.6rem] resize-none'
                    value={userStory}
                    onChange={setUserStoryHandler}
                  />
                </div>
                <span className='absolute right-[3.2rem] bottom-[2.4rem] text-[1.4rem] leading-[2.2rem] text-sub-text'>
                  {userStoryLengthString}/{limitLength} byte
                </span>
              </div>
            </div>
            <div className='mt-[2.4rem] flex gap-[1.6rem]'>
              <Button size='lg' variant='outline' className='flex-1' onClick={() => router.push("/create")}>
                이전으로
              </Button>
              <Button size='lg' className='flex-1' disabled={userStoryLength === 0} onClick={submitHandler}>
                제출하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
