import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "@/components/layout";

export const metadata: Metadata = {
  title: "KIA Heritage Event",
  description: "KIA Heritage Event"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`antialiased`}>
        <div className='skip-nav'>
          <a href='#content'>본문 바로가기</a>
        </div>
        <div className='wrapper'>
          <div id='content'>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
