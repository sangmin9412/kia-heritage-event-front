"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
        <div className='p-[4.8rem] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)] animate-in fade-in slide-in-from-bottom-10 ease-in-out duration-1000'>
          <div></div>

          <div>
            <div>
              <h3 className='mb-[1.4rem] text-[2rem] leading-[3.2rem] font-bold text-center'>사연 작성하기</h3>
              <div className='relative'>
                <Textarea
                  placeholder={placeholderText}
                  className='p-[2.4rem_3.2rem_5.8rem_3.2rem] h-[24rem] border-0 border-t border-black bg-[#f8f8f8] text-[1.6rem] leading-[2.6rem] resize-none'
                  value={userStory}
                  onChange={setUserStoryHandler}
                />
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
