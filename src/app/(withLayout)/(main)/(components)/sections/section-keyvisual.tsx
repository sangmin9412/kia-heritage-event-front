"use client";

import Image from "next/image";
import { cn, getImagePath } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import MagnetWithValue from "@/blocks/Animations/Magnet/MagnetWithValue";

const KEY_VISUAL_ITEMS = [
  {
    year: "1974",
    carName: "Brisa",
    imagePath: "/images/main/main_kv_item_01_pc.webp",
    imagePathMobile: "/images/main/main_kv_item_01_mo.webp"
  },
  {
    year: "1980",
    carName: "Bongo",
    imagePath: "/images/main/main_kv_item_02_pc.webp",
    imagePathMobile: "/images/main/main_kv_item_02_mo.webp"
  },
  {
    year: "1987",
    carName: "Pride",
    imagePath: "/images/main/main_kv_item_03_pc.webp",
    imagePathMobile: "/images/main/main_kv_item_03_mo.webp"
  },
  {
    year: "1993",
    carName: "Sportage",
    imagePath: "/images/main/main_kv_item_04_pc.webp",
    imagePathMobile: "/images/main/main_kv_item_04_mo.webp"
  },
  {
    year: "1998",
    carName: "Carnival",
    imagePath: "/images/main/main_kv_item_05_pc.webp",
    imagePathMobile: "/images/main/main_kv_item_05_mo.webp"
  },
  {
    year: "2008",
    carName: "Soul",
    imagePath: "/images/main/main_kv_item_06_pc.webp",
    imagePathMobile: "/images/main/main_kv_item_06_mo.webp"
  },
  {
    year: "2017",
    carName: "Stinger",
    imagePath: "/images/main/main_kv_item_07_pc.webp",
    imagePathMobile: "/images/main/main_kv_item_07_mo.webp"
  },
  {
    year: "2025",
    carName: "EV9 GT",
    imagePath: "/images/main/main_kv_item_08_pc.webp",
    imagePathMobile: "/images/main/main_kv_item_08_mo.webp"
  }
];

export const SectionKeyVisual = () => {
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollRef);
  const [hasAnimated, setHasAnimated] = useState(false);

  const imageHeight = 470;
  const imageWidth = 140;

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <section ref={scrollRef}>
      <div className='relative desktop:h-screen desktop:min-h-[95.5rem] desktop:aspect-auto h-auto aspect-square bg-[#f8f8f8] overflow-hidden'>
        <div className='absolute inset-0 pointer-events-none' aria-hidden='true'>
          <MagnetWithValue
            disabled={isAnimationCompleted}
            magnetStrength={50}
            className='w-full h-full flex items-center justify-center desktop:pt-[3.85rem] pt-[2.45rem]'
          >
            <div className='container pointer-events-none'>
              <div className='grid grid-cols-8 desktop:gap-[2.2rem] gap-[0.3rem]'>
                {KEY_VISUAL_ITEMS.map((item, index) => (
                  <div
                    key={item.carName}
                    className={cn("relative desktop:w-[14rem] w-[3.7rem] overflow-hidden aspect-[140/470]", {
                      "desktop:translate-y-[6rem] translate-y-[1.6rem]": (index + 1) % 2 === 0
                    })}
                    style={
                      {
                        "--scale": Math.random() + 1,
                        transform:
                          "translate3d(calc(var(--position-x) * var(--scale)), calc(var(--position-y) * var(--scale)), 0)",
                        transition: "var(--transition)",
                        willChange: "transform"
                      } as React.CSSProperties
                    }
                    suppressHydrationWarning
                  >
                    <motion.div
                      className='absolute top-0 left-0 w-full h-full overflow-hidden'
                      initial={{ opacity: 0, y: -80 }}
                      animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: -80 }}
                      transition={{ duration: 1.2, delay: 0.1 + index * 0.1, ease: "easeInOut" }}
                      onAnimationComplete={() => {
                        if (index === KEY_VISUAL_ITEMS.length - 1) {
                          setIsAnimationCompleted(false);
                        }
                      }}
                    >
                      <motion.div
                        className='absolute top-0 left-0 w-full h-full overflow-hidden'
                        initial={{ y: "-100%" }}
                        animate={hasAnimated ? { y: 0 } : { y: "-100%" }}
                        transition={{ duration: 1.2, delay: 0.1 + index * 0.1, ease: "linear" }}
                      >
                        <motion.div
                          className='w-full h-full'
                          initial={{ y: "100%" }}
                          animate={hasAnimated ? { y: 0 } : { y: "100%" }}
                          transition={{ duration: 1.2, delay: 0.1 + index * 0.1, ease: "linear" }}
                        >
                          <Image
                            src={getImagePath(item.imagePath)}
                            alt={item.carName}
                            width={imageWidth}
                            height={imageHeight}
                            className='w-full h-full object-contain'
                            unoptimized
                            priority
                          />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </MagnetWithValue>
        </div>

        <div className='relative container h-full'>
          <div className='desktop:pt-[8.6rem] pt-[4.8rem] whitespace-nowrap'>
            <motion.h3
              initial={{ opacity: 0, y: -50 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
              transition={{ duration: 1, delay: 0, ease: "easeOut" }}
              className='desktop:mb-[1.6rem] mb-[0.8rem] desktop:text-[6rem] text-[3rem] font-bold leading-[1.15]'
            >
              My moments with Kia
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: -50 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
              transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
              className='desktop:text-[3.6rem] text-[1.6rem] leading-[1.15]'
            >
              당신의 이야기로 완성되는 80년의 기억
            </motion.p>
          </div>

          <motion.div
            className='absolute left-[2rem] container:left-0 bottom-[4.3rem]'
            initial={{ opacity: 0, y: 0 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: "easeInOut" }}
          >
            <Image
              src={getImagePath("/images/main/main_kv_logo.svg")}
              alt='event-keyvisual'
              width={220}
              height={88}
              className='desktop:w-[22rem] w-[7.5rem] h-auto object-contain'
              unoptimized
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
