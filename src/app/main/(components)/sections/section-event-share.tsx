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
    <div className='py-[4rem] bg-[#f8f8f8]'>
      <div className='container'>
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='text-[2rem] leading-[3.2rem] font-bold text-sub-text'>이벤트 공유하기</h2>
          </div>
          <div>
            <ul className='flex gap-[1.6rem]'>
              {SHARE_ITEMS.map(item => (
                <li key={item.title}>
                  <Link
                    href={item.link}
                    className='flex justify-center items-center size-[4.8rem] rounded-full border border-border bg-white'
                  >
                    <Image
                      src={getImagePath(item.icon)}
                      alt={item.title}
                      width={24}
                      height={24}
                      unoptimized
                      className='size-[2.4rem] object-contain'
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
