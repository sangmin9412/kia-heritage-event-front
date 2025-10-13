# 기아 헤리티지 이벤트 (Kia Heritage Event)

기아자동차 창립 80주년을 기념하여 '나와 기아의 특별한 순간'을 주제로 한 온라인 포스터 이벤트 웹사이트입니다.

## 📋 프로젝트 개요

- **프로젝트명**: Kia Heritage Event Front-end
- **이벤트 기간**: 2025년 9월 29일 ~ 2025년 11월 10일

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
- **Motion** - React 애니메이션 라이브러리

### UI Components & Interactions

- **Radix UI** - UI 컴포넌트 라이브러리
- **Embla Carousel** - 캐러셀 컴포넌트
- **Lucide React** - 벡터 아이콘 라이브러리
- **@lottiefiles/dotlottie-react** - Lottie 애니메이션 지원
- **Sonner** - 토스트 알림 라이브러리

### Forms & Validation

- **React Hook Form** - 폼 라이브러리
- **Zod** - 스키마 선언 및 런타임 검증
- **@hookform/resolvers** - React Hook Form용 검증

### State Management & Data Fetching

- **Zustand** - 상태 관리 라이브러리
- **@tanstack/react-query** - 서버 상태 관리 라이브러리
- **Axios** - HTTP 클라이언트

### Development & Build Tools

- **ESLint** - 코드 품질 및 스타일 검사
- **Prettier** - 코드 포매터
- **Docker**

### Additional Libraries

- **Iron Session** - 세션 관리
- **js-cookie** - 쿠키 관리 유틸리티
- **dayjs** - 날짜/시간 처리 라이브러리
- **ua-parser-js** - 사용자 에이전트 파싱
- **@next/third-parties** - 서드파티 스크립트 최적화

## 📁 프로젝트 구조

```
kia-heritage-event-front/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── globals.css        # 전역 스타일
│   │   ├── error.tsx          # 에러 페이지
│   │   ├── not-found.tsx      # 404 페이지
│   │   ├── default.tsx        # 기본 페이지
│   │   ├── favicon.ico        # 파비콘
│   │   ├── (withLayout)/      # 레이아웃이 적용된 페이지 그룹
│   │   │   ├── page.tsx      # 메인 페이지
│   │   │   ├── layout.tsx    # 레이아웃 컴포넌트
│   │   │   ├── default.tsx   # 기본 페이지
│   │   │   ├── (main)/       # 메인 이벤트 페이지
│   │   │   ├── form/         # 이벤트 참여 폼 페이지
│   │   │   └── create/       # 포스터 생성 페이지
│   │   ├── @modal/           # 모달 슬롯
│   │   ├── api/              # API 라우트
│   │   │   └── poster/       # 포스터 관련 API
│   │   └── form-ios/         # iOS 전용 폼 페이지
│   ├── components/            # 재사용 가능 컴포넌트
│   │   ├── ui/               # 기본 UI 컴포넌트 (Radix UI 기반)
│   │   ├── features/         # 기능별 컴포넌트
│   │   │   ├── modal/        # 모달 컴포넌트들
│   │   │   ├── alert/        # 알림 컴포넌트
│   │   │   ├── layout/       # 레이아웃 컴포넌트
│   │   │   └── error/        # 에러 처리 컴포넌트
│   │   ├── contexts/         # React Context
│   │   └── providers/        # Provider 컴포넌트들
│   ├── features/             # 기능별 모듈
│   │   └── poster/           # 포스터 생성 관련 기능
│   ├── blocks/               # React bits 컴포넌트
│   │   ├── Animations/       # 애니메이션 블록
│   │   └── TextAnimations/   # 텍스트 애니메이션 블록
│   ├── hooks/                # 커스텀 훅
│   ├── utils/                # 유틸리티 함수
│   ├── types/                # TypeScript 타입 정의
│   ├── config/               # 설정 파일
│   ├── assets/               # 정적 자산 파일
│   ├── lib/                  # 클라이언트 라이브러리 설정
│   ├── lib-server/           # 서버 사이드 라이브러리 설정
│   ├── styles/               # 스타일 파일
│   └── middleware.ts         # Next.js 미들웨어
├── public/                   # 정적 파일
│   ├── images/              # 이미지 파일
│   ├── fonts/               # 폰트 파일
│   ├── lotties/             # Lottie 애니메이션 파일
│   ├── js/                  # JavaScript 파일
│   └── file.svg             # SVG 파일
├── scripts/                 # 빌드 및 배포 스크립트
│   └── deploy.sh           # 배포 스크립트
├── Dockerfile              # Docker 컨테이너 설정
├── docker-compose.yml      # Docker Compose 설정
├── .dockerignore           # Docker 무시 파일
├── next.config.ts          # Next.js 설정
├── tsconfig.json           # TypeScript 설정
├── eslint.config.mjs       # ESLint 설정
├── .prettierrc             # Prettier 설정
├── postcss.config.mjs      # PostCSS 설정
├── components.json         # Shadcn UI 컴포넌트 설정
├── jsrepo.json             # React Bits 관련 설정
├── .gitignore              # Git 무시 파일
└── package.json            # 의존성 및 스크립트
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
   [http://localhost:5500](http://localhost:5500)에서 애플리케이션을 확인할 수 있습니다.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작 (포트 5500)
npm run start

# 린팅
npm run lint

# Docker 배포
npm run deploy
```

## 📝 개발 노트

### 프로젝트 구조

- **Route Groups**: `(withLayout)`, `@modal` 등을 활용한 레이아웃 및 모달 구조화
- **Feature-based Architecture**: 기능별로 모듈화된 컴포넌트 구조
- **UI Components**: Radix UI 기반의 재사용 가능한 컴포넌트 라이브러리

### 설정 및 데이터 관리

- 이벤트 기간 및 경품 정보는 `src/config/` 디렉토리에서 관리
- 상태 관리는 Zustand를 통해 전역 상태 관리

### 리소스 관리

- 이미지 파일은 `public/images/` 디렉토리에 위치
- Lottie 애니메이션은 `public/lotties/` 디렉토리에 위치
- 폰트 파일은 `public/fonts/` 디렉토리에 위치

### 개발 도구

- **TypeScript**를 통한 타입 안전성 보장
- **ESLint**와 **Prettier**를 통한 코드 품질 관리
- **Docker**를 통한 컨테이너화 배포 지원
- 커스텀 훅은 `src/hooks/` 디렉토리에서 관리
- 유틸리티 함수는 `src/utils/` 디렉토리에서 관리
- 클라이언트 라이브러리 설정은 `src/lib/`에서 관리
- 서버 사이드 라이브러리 설정은 `src/lib-server/`에서 관리

## 환경변수

운영 및 개발서버 환경변수는 해당 서버에 설정되어있습니다.

```bash
#local =================================================
# .env
NEXT_PUBLIC_URL=http://localhost:5500
KAKAO_SDK_KEY=ddfdsvdvsdv
SESSION_SECRET=e0b2ce9e05e9bc945dc2b534587ce94f

# .env.production
NEXT_PUBLIC_API_URL=https://dev-api.kia80years-event.com

# .env.development
NEXT_PUBLIC_API_URL=https://dev-api.kia80years-event.com
# ======================================================
```

## 배포

### Docker를 이용한 배포

```bash
# Docker Compose를 이용한 배포
git pull
npm run deploy # 개발,운영서버 내 노드가 설치되어있지 않아 npm 사용할 수 없음.

# 또는 직접 Docker 명령어 사용
git pull
docker compose down && docker compose up --build -d
```

### 배포 스크립트

프로젝트에는 배포를 위한 스크립트가 포함되어 있습니다:

```bash
# 배포 스크립트 실행
git pull
sh ./scripts/deploy.sh
```

## 참고사항
1. 애널리틱스 관련 설정은 lib/analytics.tsx 파일에 정리되어있습니다.
   - 파일 내 메서드를 확인하여 데이터 수집이 필요한 시점에 호출하면 됩니다.
   - 아래 티켓 내용 기반으로 현재 작업은 되어있고 추가로 PAGEVIEW_VISIT, PAGEVIEW_CREATE, PAGEVIEW_20S_VISIT 이벤트는 동일한 시점에 호출하도록 되어있는데 고객사에 각 이벤트별 정확한 호출 시점 문의한 상태입니다.
   - 관련 티켓 링크 https://flow.team/l/19QIv
2. 현재 운영서버와 개발서버 내 소스 코드는 동일하나 도커 파일 설정만 다른 상태입니다.
   - 운영서버만 5500, 5501 2개 포트에 실행해야 하는 상황으로 차이가 있습니다.
3. 메인페이지에서 이벤트 참여하기 진행 시 IOS 에서는 페이지로 이동하도록 조건 처리 되어있습니다.
   - IOS26버전 사파리 버그로 고정된 요소(모달) 내 입력필드가 있을 경우 포커스 위치를 제대로 잡아주지 못하는 이슈가 있어 IOS인 경우에는 form-ios 페이지에서 이벤트 참여하기 항목 입력할 수 있도록 해두었습니다.