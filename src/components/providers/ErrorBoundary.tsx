"use client";

import React, { Component, ReactNode } from "react";
import ErrorPage from "@/components/features/error/ErrorPage";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트합니다.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 에러 로깅
    console.error("Error caught by boundary:", error, errorInfo);

    // 여기서 에러 리포팅 서비스에 에러를 전송할 수 있습니다
    // 예: Sentry, LogRocket 등
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      // 커스텀 폴백 UI가 있으면 사용, 없으면 기본 에러 페이지 사용
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorPage
          title='페이지 오류가 발생했습니다'
          message={this.state.error?.message}
          showRetry={true}
          showHome={true}
          showBack={true}
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}

// 함수형 컴포넌트로 래핑하여 사용하기 쉽게 만듭니다
interface ErrorBoundaryWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ErrorBoundaryWrapper({ children, fallback }: ErrorBoundaryWrapperProps) {
  return <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>;
}
