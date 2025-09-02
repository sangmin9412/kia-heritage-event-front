import "@/app/globals.css";

export default function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <html lang='ko'>
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
