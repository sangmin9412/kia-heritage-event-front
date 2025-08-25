"use client";

import {
  SectionButtons,
  SectionEventEnter,
  SectionEventInfo,
  SectionEventMoments,
  SectionEventNotice,
  SectionEventPrize,
  SectionEventShare,
  SectionInstagramEvent,
  SectionKeyVisual
} from "@/app/main/(components)";
import { ReactLenis } from "@/lib/lenis";

export const MainContainer = () => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.04,
        duration: 1.5,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.7,
        touchMultiplier: 1,
        autoResize: true
      }}
    >
      <main className='main-content'>
        <h1 className='blind'>기아 헤리티지 이벤트 안내</h1>
        <SectionKeyVisual />
        <SectionEventMoments />
        <SectionEventInfo />
        <SectionEventEnter />
        <SectionEventPrize />
        <SectionInstagramEvent />
        <SectionButtons />
        <SectionEventShare />
        <SectionEventNotice />
      </main>
    </ReactLenis>
  );
};
