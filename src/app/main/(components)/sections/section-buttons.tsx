import { Button } from "@/components/ui/button";
import Link from "next/link";

export const SectionButtons = () => {
  return (
    <div className='py-[8rem] bg-white'>
      <div className='flex justify-center items-center gap-[1.6rem]'>
        <Button size='lg' variant='outline' className='w-[34rem]'>
          기아 헤리티지 더 알아보기
        </Button>
        <Button size='lg' className='w-[34rem]' asChild>
          <Link href='/form'>이벤트 참여하기</Link>
        </Button>
      </div>
    </div>
  );
};
