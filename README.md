# 기아 헤리티지 이벤트 (Kia Heritage Event)

기아자동차 창립 80주년을 기념하여 '나와 기아의 특별한 순간'을 주제로 한 온라인 포스터 이벤트 웹사이트입니다.

## 📋 프로젝트 개요

- **프로젝트명**: Kia Heritage Event Front-end
- **설명**: 사용자가 '나와 기아'의 추억이 담긴 사진으로 개인 맞춤 포스터를 만들고 인스타그램에 공유하는 이벤트 참여 플랫폼
- **이벤트 기간**: 2025년 9월 29일 ~ 2025년 11월 10일
- **대상**: 대한민국 국민 누구나 (기아와 함께한 순간이 있는 사람)

## 🚀 기술 스택

### Core Framework

- **Next.js 15.4.7**
- **React 19.1.0**
- **TypeScript 5**

### Styling & Animation

- **Tailwind CSS v4** - 유틸리티 기반 CSS 프레임워크
- **Sass** - CSS 전처리기
- **GSAP** - 애니메이션 라이브러리
- **Lenis** - 부드러운 스크롤 구현

### UI Components & Interactions

- **Radix UI** - UI 컴포넌트
- **Embla Carousel** - 캐러셀 컴포넌트
- **Lucide React** - SVG 아이콘 라이브러리

### Forms & Validation

- **React Hook Form** - 폼 라이브러리
- **Zod** - 스키마 선언 및 검증

### HTTP Client

- **Axios** - HTTP 클라이언트

## 📁 프로젝트 구조

```
kia-heritage-event-front/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── page.tsx           # 메인 페이지
│   │   ├── globals.css        # 전역 스타일
│   │   └── main/              # 메인 이벤트 페이지
│   │       └── (components)/  # 이벤트 섹션 컴포넌트들
│   │           ├── container/ # 메인 컨테이너
│   │           ├── sections/  # 이벤트 섹션들
│   │           └── shared/    # 공유 컴포넌트
│   ├── components/            # 재사용 가능 컴포넌트
│   │   ├── ui/               # 기본 UI 컴포넌트
│   │   ├── layout/           # 레이아웃 컴포넌트
│   │   └── error/            # 에러 처리 컴포넌트
│   ├── lib/                  # 유틸리티 함수
│   ├── config/               # 설정 파일
│   └── styles/               # 스타일 파일
├── public/                   # 정적 파일
└── package.json              # 의존성 및 스크립트
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0 이상
- npm, yarn, pnpm, bun 중 택일

### 설치 및 실행

1. **의존성 설치**

   ```bash
   npm install
   # 또는
   yarn install
   # 또는
   pnpm install
   # 또는
   bun install
   ```

2. **개발 서버 시작**

   ```bash
   npm run dev
   # 또는
   yarn dev
   # 또는
   pnpm dev
   # 또는
   bun dev
   ```

3. **브라우저에서 확인**
   [http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm run start

# 린팅
npm run lint
```

## 🎨 주요 특징

- **반응형 디자인**: 모바일과 데스크톱 모두 최적화
- **부드러운 스크롤**: Lenis를 활용한 고품질 스크롤 경험
- **접근성**: Radix UI를 활용한 WCAG 준수 컴포넌트
- **성능 최적화**: Next.js의 이미지 최적화 및 코드 분할
- **모던 애니메이션**: GSAP을 활용한 인터랙티브 애니메이션
- **SEO 최적화**: Next.js의 메타데이터 API 활용

## 📝 개발 노트

- 이벤트 기간 및 경품 정보는 \`src/config/index.ts\`에서 관리
- 이미지 파일은 \`public/images/\` 디렉토리에 위치
- 컴포넌트는 섹션별로 분리하여 유지보수성 확보
- TypeScript를 통한 타입 안전성 보장
- ESLint와 Prettier를 통한 코드 품질 관리
