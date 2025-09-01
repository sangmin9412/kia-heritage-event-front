"use client";

import { useCallback, useState, useRef, useMemo } from "react";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import ScrollReveal from "@/blocks/TextAnimations/ScrollReveal/ScrollReveal";
import { getImagePath } from "@/lib/utils";
import { motion } from "motion/react";

export const SectionEventMoments = () => {
  const [scrollDirection, setScrollDirection] = useState<"forward" | "backward">("forward");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dragStartX = useRef<number>(0);
  const dragEndX = useRef<number>(0);

  // 드래그 종료 시 캐러셀 재시작
  const handleCarouselApi = useCallback((api: ReturnType<typeof useEmblaCarousel>[1]) => {
    if (!api) return;

    // 드래그 시작 감지
    const onPointerDown = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      const event = window.event as PointerEvent;
      if (event) {
        dragStartX.current = event.clientX;
      }
    };

    // 드래그 종료 감지
    const onPointerUp = () => {
      const event = window.event as PointerEvent;

      if (event) {
        dragEndX.current = event.clientX;
      }

      // 기존 타이머가 있다면 취소
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 새로운 타이머 설정 (디바운스) - 모든 로직을 타이머 안에서 실행
      timeoutRef.current = setTimeout(() => {
        // 드래그 방향 계산 및 설정
        if (dragStartX.current && dragEndX.current) {
          const deltaX = dragEndX.current - dragStartX.current;
          const threshold = 30; // 방향 감지를 위한 최소 거리

          // 드래그 방향에 따라 스크롤 방향 설정
          if (Math.abs(deltaX) > threshold) {
            const newDirection = deltaX > 0 ? "backward" : "forward";
            setScrollDirection(newDirection);
          }
        }
        timeoutRef.current = null;
      }, 600);
    };

    // Embla carousel의 이벤트 리스너 추가
    api.on("pointerDown", onPointerDown);
    api.on("pointerUp", onPointerUp);

    return () => {
      api.off("pointerDown", onPointerDown);
      api.off("pointerUp", onPointerUp);
      // 컴포넌트 언마운트 시 타이머 정리
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  // AutoScroll 플러그인을 방향에 따라 생성
  const autoScrollPlugin = AutoScroll({
    playOnInit: true, // 초기 재생 여부
    stopOnInteraction: false, // 상호작용 시 정지 여부
    speed: 1, // 스크롤 속도
    startDelay: 300, // 시작 지연 시간
    direction: scrollDirection // 스크롤 방향
  });

  const carouselItems = useMemo(() => {
    return [
      getImagePath("/images/main/moments_img_01.webp"),
      getImagePath("/images/main/moments_img_02.webp"),
      getImagePath("/images/main/moments_img_03.webp"),
      getImagePath("/images/main/moments_img_04.webp")
    ];
  }, []);

  return (
    <section className='py-[12rem] bg-primary overflow-hidden'>
      <h3 className='blind'>My Moments with Kia</h3>
      <div className='container'>
        <div className='mb-[8rem]'>
          <div
            className='text-[3rem] text-white [&_br:first-of-type+span]:mt-[2rem]'
            aria-label='수많은 도전과 기회로 달려온 Kia의 80년. Kia의 헤리티지 속에서 여러분이 느낀 영감과 감동, 그리고 나만의 My moments with Kia를 들려주세요.'
          >
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
              rotationEnd='center center'
              wordAnimationEnd='center center'
            >
              수많은 도전과 기회로 달려온 Kia의 80년.
              <br />
              Kia의 헤리티지 속에서 여러분이 느낀 영감과 감동,
              <br />
              그리고 나만의 &apos;My moments with Kia&apos;를 들려주세요.
            </ScrollReveal>
          </div>
        </div>

        <motion.div
          className='relative flex items-center justify-center overflow-hidden'
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <Carousel
            opts={{
              loop: true,
              align: "start",
              watchDrag: true
            }}
            plugins={[autoScrollPlugin]}
            setApi={handleCarouselApi}
          >
            <CarouselContent>
              {[...carouselItems, ...carouselItems].map((img, index) => (
                <CarouselItem key={index + index} className='pl-[1rem] basis-[29rem]'>
                  <div className='w-[28rem] h-[35rem]'>
                    <Image
                      src={img}
                      alt={`moments-img-${index + 1}`}
                      width={280}
                      height={350}
                      className='w-full h-full object-cover'
                      unoptimized
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className='absolute top-0 right-0 w-[10rem] h-full bg-gradient-to-r from-transparent to-primary'></div>
          <div className='absolute top-0 left-0 w-[10rem] h-full bg-gradient-to-l from-transparent to-primary'></div>
        </motion.div>
      </div>
    </section>
  );
};
