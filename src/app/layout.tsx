import "@/app/globals.css";
import { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "KIA Heritage Event",
  description: "KIA Heritage Event",
  openGraph: {
    url: process.env.PUBLIC_URL,
    title: "KIA Heritage Event",
    description: "KIA Heritage Event",
    images: [
      {
        url: `${process.env.PUBLIC_URL}/images/share_thumbnail.png`,
        width: 1200,
        height: 628
      }
    ],
    type: "website"
  }
};

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
        <GoogleAnalytics gaId='DC-10576537' />
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
