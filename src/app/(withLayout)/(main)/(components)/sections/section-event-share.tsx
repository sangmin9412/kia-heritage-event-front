import { SITE_METADATA } from "@/config";
import { useToaster } from "@/hooks/use-toaster";
import { copyClipboard, getImagePath } from "@/lib/utils";
import Image from "next/image";
import { kakaoSdk } from "@/lib/kakao.sdk";

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
  const { toast } = useToaster();

  const handleShareFacebook = () => {
    if (process.env.NEXT_PUBLIC_URL) {
      const shareUrl = encodeURIComponent(process.env.NEXT_PUBLIC_URL);
      const shareText = encodeURIComponent(SITE_METADATA.title || "기아 헤리티지 이벤트");
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`,
        "_blank",
        "width=600,height=400"
      );
    }
  };

  const handleShareTwitter = () => {
    if (process.env.NEXT_PUBLIC_URL) {
      const shareUrl = encodeURIComponent(process.env.NEXT_PUBLIC_URL);
      const shareText = encodeURIComponent(SITE_METADATA.title || "기아 헤리티지 이벤트");
      window.open(
        `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`,
        "_blank",
        "width=600,height=400"
      );
    }
  };

  const handleShareKakaoTalk = () => {
    // 카카오 SDK 공유 기능 사용
    const Kakao = kakaoSdk();
    if (Kakao) {
      Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: SITE_METADATA.openGraph.title,
          description: SITE_METADATA.openGraph.description,
          imageUrl: `${process.env.NEXT_PUBLIC_URL}/images/share_kakao_thumb.png`,
          link: {
            webUrl: process.env.NEXT_PUBLIC_URL,
            mobileWebUrl: process.env.NEXT_PUBLIC_URL
          }
        }
      });
    }
  };

  const handleCopyClipboard = async () => {
    if (process.env.NEXT_PUBLIC_URL) {
      const result = await copyClipboard(process.env.NEXT_PUBLIC_URL);
      if (result) {
        toast("공유 링크를 클립보드에 복사했습니다.");
      } else {
        toast("공유 링크를 클립보드에 복사하는데 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  const handleShare = async (item: (typeof SHARE_ITEMS)[number]) => {
    switch (item.title) {
      case "페이스북":
        handleShareFacebook();
        break;
      case "트위터":
        handleShareTwitter();
        break;
      case "카카오톡":
        handleShareKakaoTalk();
        break;
      case "공유하기":
        handleCopyClipboard();
        break;
    }
  };

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
                  <button
                    className='flex justify-center items-center size-[4rem] rounded-full border border-border bg-white cursor-pointer'
                    onClick={() => handleShare(item)}
                  >
                    <Image
                      src={getImagePath(item.icon)}
                      alt={item.title}
                      width={24}
                      height={24}
                      unoptimized
                      className='desktop:size-[2.4rem] size-[2rem] object-contain'
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
