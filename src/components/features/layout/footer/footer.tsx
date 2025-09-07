"use client";

import { getImagePath } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const Footer = () => {
  const pathname = usePathname();
  const isMain = useMemo(() => ["/", "/form"].includes(pathname), [pathname]);

  return (
    <footer
      data-layout={isMain ? "main" : "sub"}
      className='relative bg-primary mt-auto [&[data-layout="sub"]]:bg-[#f8f8f8]'
    >
      <div className='container'>
        <div className='flex desktop:flex-row flex-col items-center justify-between desktop:h-[12rem] h-auto desktop:py-0 py-[4rem] desktop:gap-0 gap-[2rem]'>
          <div className='flex'>
            <p className='desktop:text-[1.6rem] text-[1.3rem] text-secondary'>© Kia Corp. All rights reserved</p>
          </div>
          <div className='flex'>
            <ul className='flex gap-[1rem]'>
              {[
                {
                  name: "instagram",
                  path: "/images/common/icons/ic_footer_instagram.svg",
                  link: "https://www.instagram.com/kia.kor/"
                },
                {
                  name: "youtube",
                  path: "/images/common/icons/ic_footer_youtube.svg",
                  link: "https://www.youtube.com/@KiaKorea"
                },
                {
                  name: "twitter",
                  path: "/images/common/icons/ic_footer_twitter.svg",
                  link: "#"
                }
              ].map(item => (
                <li key={item.name}>
                  <a href={item.link} target='_blank' className='flex items-center justify-center w-[5rem] h-[5rem]'>
                    <Image
                      src={getImagePath(item.path)}
                      alt={item.name}
                      width={24}
                      height={24}
                      className='w-[2.4rem] h-[2.4rem]'
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
