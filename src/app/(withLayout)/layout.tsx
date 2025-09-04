import "@/app/globals.css";
import { Footer } from "@/components/features/layout";
import { AppProvider } from "@/components/providers";

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
