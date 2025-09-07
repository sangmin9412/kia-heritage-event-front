import { getImagePath } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const SHARE_ITEMS = [
  {
    title: "페이스북",
    icon: "/images/common/icons/ic_share_facebook.svg",
    link: "#"
  },
  {
    title: "트위터",
    icon: "/images/common/icons/ic_share_x.svg",
    link: "#"
  },

  {
    title: "카카오톡",
    icon: "/images/common/icons/ic_share_kakao.svg",
    link: "#"
  },

  {
    title: "공유하기",
    icon: "/images/common/icons/ic_share_normal.svg",
    link: "#"
  }
];

export const SectionEventShare = () => {
  return (
    <div className='desktop:py-[4rem] py-[2rem] border-t border-border'>
      <div className='container'>
        <div className='flex desktop:justify-between justify-center items-center'>
          <div className='hidden desktop:block'>
            <h3 className='text-[2rem] leading-[3.2rem] font-bold text-sub-text'>이벤트 공유하기</h3>
          </div>
          <div>
            <ul className='flex gap-[1.6rem]'>
              {SHARE_ITEMS.map(item => (
                <li key={item.title}>
                  <Link
                    href={item.link}
                    className='flex justify-center items-center desktop:size-[4.8rem] size-[4rem] rounded-full border border-border bg-white'
                  >
                    <Image
                      src={getImagePath(item.icon)}
                      alt={item.title}
                      width={24}
                      height={24}
                      unoptimized
                      className='desktop:size-[2.4rem] size-[2rem] object-contain'
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
