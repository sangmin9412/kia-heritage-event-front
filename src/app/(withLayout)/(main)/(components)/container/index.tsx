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
} from "@/app/(withLayout)/(main)/(components)";
import { ANALYTICS_HANDLER, Event } from "@/lib/analytics";
import { ReactLenis } from "@/lib/lenis";
import { useEffect } from "react";

export const MainContainer = () => {
  useEffect(() => {
    ANALYTICS_HANDLER[Event.PAGEVIEW_CREATE].event();
    ANALYTICS_HANDLER[Event.PAGEVIEW_VISIT].event();
    ANALYTICS_HANDLER[Event.PAGEVIEW_20S_VISIT].event();
  }, []);

  return (
    <>
      {ANALYTICS_HANDLER[Event.PAGEVIEW_VISIT].noscript()}
      {ANALYTICS_HANDLER[Event.PAGEVIEW_20S_VISIT].noscript()}
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
          <h2 className='blind'>이벤트 안내</h2>
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
    </>
  );
};
