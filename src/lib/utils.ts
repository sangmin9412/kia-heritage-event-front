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

export const downloadImage = (image?: string | null, fileName: string = "kia-heritage-event-poster.png") => {
  if (!image) return;
  const a = document.createElement("a");
  a.href = image;
  a.download = fileName;
  a.click();
  a.remove();
  URL.revokeObjectURL(image);
  return true;
};

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

// 최소값과 최대값 사이의 값 반환
export const minmaxValue = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

// base64 이미지를 파일로 변환
export const convertBase64ImgToImgFile = (data: string, fileName: string) => {
  const arr = data.split(","); // arr = [data:image/jpg;base64 , /9j/4AAQSkZJRgABAQAAAQABA ...]
  const [mime, binaryData] = [arr[0].match(/:(.*?);/)?.[1], atob(arr[1])]; // atob는 base64 data를 decode한다
  // mime = image/jpg
  // binrayData = image의 binary data (atob는 window 내장 객체로 base64 data를 decode하는 메소드이다.)
  let n = binaryData.length;
  const unit8Array = new Uint8Array(n);
  // binrayData를 다루기 위해 unit8Array Typpedarray 이용
  // 이미지 데이터는 각 픽셀단위로 0~255로 표현되기 때문에 unit8Array를 이용하는 게 효율적
  while (n--) {
    unit8Array[n] = binaryData.charCodeAt(n);
    // charCodeAt(n)은 array의 index=n 문자의 유니 코드 값을 반환한다.
  }
  return new File([unit8Array], fileName, { type: mime });
};

// 비동기 대기
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const sliceStringByByte = (str: string, byteLength: number) => {
  const encoder = new TextEncoder();
  let currentByteLength = 0;
  let i = 0;
  while (i < str.length && currentByteLength < byteLength) {
    const byteCount = encoder.encode(str[i]).length;
    currentByteLength += byteCount;
    i++;
  }

  return str.slice(0, currentByteLength > byteLength ? i - 1 : i);
};

/**
 * 클립보드에 텍스트 복사
 * @param {string} text - 복사할 텍스트
 * @returns {Promise<boolean>} 복사 성공 여부
 */
export async function copyClipboard(text: string) {
  if (!text) return false;

  // Modern API 방식 시도
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("Failed to copy with modern API:", err);
    }
  }

  // Fallback: execCommand 방식
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // iOS에서 복사를 위해 필요한 스타일 설정
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";

    document.body.appendChild(textArea);

    if (navigator.userAgent.match(/ipad|iphone/i)) {
      // iOS 워크어라운드
      const range = document.createRange();
      range.selectNodeContents(textArea);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }

    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error("Failed to copy with execCommand:", err);
    return false;
  }
}

// DEBOUNCE
export const debounce = <Args extends unknown[], R>(func: (...args: Args) => R, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: Args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

import dayjs from 'dayjs';

/**
 * 날짜/시간 형식을 자동 감지하여 비교하는 함수 (이후 여부)
 * 지원 형식: YYYY-MM-DD 또는 YYYY-MM-DD HH:mm:ss
 * @param {string} baseDateTime - 기준 날짜/시간
 * @param {string} compareDateTime - 비교할 날짜/시간
 * @returns {boolean} compareDateTime이 baseDateTime 이후이면 true, 이전이면 false
 */
export const isAfterDate = (baseDateTime: string, compareDateTime: string): boolean => {
  if (!baseDateTime || !compareDateTime) return false;
  
  // 형식 자동 감지
  const dateTimeFormat = baseDateTime.includes(' ') ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
  const compareDateTimeFormat = compareDateTime.includes(' ') ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
  
  const base = dayjs(baseDateTime, dateTimeFormat, true);
  const compare = dayjs(compareDateTime, compareDateTimeFormat, true);
  
  // 유효한 날짜인지 확인
  if (!base.isValid() || !compare.isValid()) {
    console.error("Invalid date/time provided. Please use YYYY-MM-DD or YYYY-MM-DD HH:mm:ss format.");
    return false;
  }
  
  return compare.isAfter(base);
};

/**
 * 날짜/시간 형식을 자동 감지하여 비교하는 함수 (이전 여부)
 * 지원 형식: YYYY-MM-DD 또는 YYYY-MM-DD HH:mm:ss
 * @param {string} baseDateTime - 기준 날짜/시간
 * @param {string} compareDateTime - 비교할 날짜/시간
 * @returns {boolean} compareDateTime이 baseDateTime 이전이면 true, 이후이면 false
 */
export const isBeforeDate = (baseDateTime: string, compareDateTime: string): boolean => {
  if (!baseDateTime || !compareDateTime) return false;
  
  // 형식 자동 감지
  const dateTimeFormat = baseDateTime.includes(' ') ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
  const compareDateTimeFormat = compareDateTime.includes(' ') ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
  
  const base = dayjs(baseDateTime, dateTimeFormat, true);
  const compare = dayjs(compareDateTime, compareDateTimeFormat, true);
  
  // 유효한 날짜인지 확인
  if (!base.isValid() || !compare.isValid()) {
    console.error("Invalid date/time provided. Please use YYYY-MM-DD or YYYY-MM-DD HH:mm:ss format.");
    return false;
  }
  
  return compare.isBefore(base);
};

/**
 * 특정 날짜 형식으로 비교하는 함수 (이후 여부)
 * @param {string} baseDateTime - 기준 날짜/시간
 * @param {string} compareDateTime - 비교할 날짜/시간
 * @param {string} format - 날짜 형식 (기본값: 'YYYY-MM-DD')
 * @returns {boolean} compareDateTime이 baseDateTime 이후이면 true, 이전이면 false
 */
export const isAfterDateWithFormat = (
  baseDateTime: string, 
  compareDateTime: string, 
  format: string = 'YYYY-MM-DD'
): boolean => {
  if (!baseDateTime || !compareDateTime) return false;
  
  const base = dayjs(baseDateTime, format, true);
  const compare = dayjs(compareDateTime, format, true);
  
  // 유효한 날짜인지 확인
  if (!base.isValid() || !compare.isValid()) {
    console.error(`Invalid date/time provided. Please use ${format} format.`);
    return false;
  }
  
  return compare.isAfter(base);
};

/**
 * 특정 날짜 형식으로 비교하는 함수 (이전 여부)
 * @param {string} baseDateTime - 기준 날짜/시간
 * @param {string} compareDateTime - 비교할 날짜/시간
 * @param {string} format - 날짜 형식 (기본값: 'YYYY-MM-DD')
 * @returns {boolean} compareDateTime이 baseDateTime 이전이면 true, 이후이면 false
 */
export const isBeforeDateWithFormat = (
  baseDateTime: string, 
  compareDateTime: string, 
  format: string = 'YYYY-MM-DD'
): boolean => {
  if (!baseDateTime || !compareDateTime) return false;
  
  const base = dayjs(baseDateTime, format, true);
  const compare = dayjs(compareDateTime, format, true);
  
  // 유효한 날짜인지 확인
  if (!base.isValid() || !compare.isValid()) {
    console.error(`Invalid date/time provided. Please use ${format} format.`);
    return false;
  }
  
  return compare.isBefore(base);
};


