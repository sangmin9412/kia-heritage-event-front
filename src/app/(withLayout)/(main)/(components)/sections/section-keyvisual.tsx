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
      <div className='relative h-screen min-h-[92rem] bg-[#f8f8f8] overflow-hidden'>
        <div className='absolute inset-0' aria-hidden='true'>
          <MagnetWithValue disabled={isAnimationCompleted} magnetStrength={50} className='w-full h-full pt-[21.1rem]'>
            <div className='container pointer-events-none'>
              <div className='grid grid-cols-8 gap-[2.2rem]'>
                {KEY_VISUAL_ITEMS.map((item, index) => (
                  <div
                    key={item.carName}
                    className={cn("relative w-[14rem] h-[47rem] overflow-hidden", {
                      "translate-y-[6rem]": (index + 1) % 2 === 0
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
                        initial={{ y: -imageHeight }}
                        animate={hasAnimated ? { y: 0 } : { y: -imageHeight }}
                        transition={{ duration: 1.2, delay: 0.1 + index * 0.1, ease: "linear" }}
                      >
                        <motion.div
                          className='w-full h-full'
                          initial={{ y: imageHeight }}
                          animate={hasAnimated ? { y: 0 } : { y: imageHeight }}
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
          <div className='mb-[4.3rem] pt-[4.3rem]'>
            <motion.h3
              initial={{ opacity: 0, y: -50 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
              transition={{ duration: 1, delay: 0, ease: "easeOut" }}
              className='mb-[1.6rem] text-[6rem] font-bold leading-[1.14]'
            >
              My moments with Kia
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: -50 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
              transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
              className='text-[3.6rem] leading-[1.14]'
            >
              당신의 이야기로 완성되는 80년의 기억
            </motion.p>
          </div>

          <motion.div
            className='absolute left-0 bottom-[4.3rem]'
            initial={{ opacity: 0, y: 0 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: "easeInOut" }}
          >
            <Image
              src={getImagePath("/images/main/main_kv_logo.svg")}
              alt='event-keyvisual'
              width={220}
              height={88}
              className='w-[22rem] h-[8.8rem] object-contain'
              unoptimized
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
