import "@/app/globals.css";
import { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE_METADATA } from "@/config";
import Script from "next/script";

export const metadata: Metadata = SITE_METADATA;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <html lang='ko'>
      <head>
        <meta name="color-scheme" content="only light" />
        <GoogleAnalytics gaId='DC-10576537' />
        <Script strategy='beforeInteractive' src='/js/kakao.min.js' />
      </head>
      <body className='antialiased'>
        <h1 className='blind'>기아 헤리티지 이벤트</h1>
        <div className='skip-nav'>
          <a href='#content'>본문 바로가기</a>
        </div>
        {children}
        {modal}
      </body>
    </html>
  );
}
