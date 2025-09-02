import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { Footer } from "@/components/features/layout";
import { AppProvider } from "@/components/providers";

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

export default function WithLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppProvider>
        <div className='wrapper contain-paint'>
          <div id='content'>{children}</div>
          <Footer />
        </div>
      </AppProvider>
    </>
  );
}
