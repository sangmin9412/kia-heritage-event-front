import { basePath } from "@/config";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const BUILD_TIME = process.env.NEXT_PUBLIC_BUILD_TIME || "0";
const nowDate = () => BUILD_TIME;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImagePath(path: string, isQueryString: boolean = true) {
  return `${basePath}${path}${isQueryString ? `?v=${nowDate()}` : ""}`;
}

// 숫자만 입력
export const handleNumericInput = (value: string, maxLength: number = 4): string => {
  const numbersOnly = value.replace(/[^0-9]/g, "");
  return numbersOnly.slice(0, maxLength);
};

// 숫자만 붙여넣기
export const handleNumericPaste = (e: React.ClipboardEvent<HTMLInputElement>, maxLength: number = 4): string => {
  e.preventDefault();
  const pastedText = e.clipboardData.getData("text");
  return handleNumericInput(pastedText, maxLength);
};

// 영문자만 입력
export const handleEnglishOnlyInput = (value: string, maxLength: number = 50): string => {
  // Remove all characters except English letters and spaces
  const englishOnly = value.replace(/[^a-zA-Z\s]/g, "");
  return englishOnly.slice(0, maxLength);
};

// 영문자만 붙여넣기
export const handleEnglishOnlyPaste = (e: React.ClipboardEvent<HTMLInputElement>, maxLength: number = 50): string => {
  e.preventDefault();
  const pastedText = e.clipboardData.getData("text");
  return handleEnglishOnlyInput(pastedText, maxLength);
};

// 한글만 입력
export const handleKoreanOnlyInput = (value: string, maxLength: number = 50): string => {
  // Remove numbers and special characters, keep only letters and spaces
  const koreanOnly = value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/g, "");
  return koreanOnly.slice(0, maxLength);
};

// 한글만 붙여넣기
export const handleKoreanOnlyPaste = (e: React.ClipboardEvent<HTMLInputElement>, maxLength: number = 50): string => {
  e.preventDefault();
  const pastedText = e.clipboardData.getData("text");
  return handleKoreanOnlyInput(pastedText, maxLength);
};

// 한글제거 입력
export const handleDeleteKoreanOnlyInput = (value: string, maxLength: number = 50): string => {
  const withoutKorean = value.replace(/[가-힣ㄱ-ㅎㅏ-ㅣ]/g, "");
  return withoutKorean.slice(0, maxLength);
};

// 공백 제거 입력
export const handleSpaceOnlyInput = (value: string, maxLength: number = 50): string => {
  const spaceOnly = value.replace(/\s+/g, "");
  return spaceOnly.slice(0, maxLength);
};
