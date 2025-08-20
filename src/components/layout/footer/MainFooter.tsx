import { getImagePath } from "@/lib/utils";
import Image from "next/image";

const MainFooter = () => {
  return (
    <footer className='bg-primary mt-auto'>
      <div className='container'>
        <div className='flex items-center justify-between h-[12rem]'>
          <div className='flex'>
            <p className='text-secondary'>© Kia Corp. All rights reserved</p>
          </div>
          <div className='flex'>
            <ul className='flex gap-[1rem]'>
              {[
                {
                  name: "instagram",
                  path: "/images/common/icons/ic_footer_instagram.svg",
                  link: "#"
                },
                {
                  name: "youtube",
                  path: "/images/common/icons/ic_footer_youtube.svg",
                  link: "#"
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

export default MainFooter;
