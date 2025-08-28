import Cookies from "js-cookie";

/**
 * 쿠키에 데이터를 저장하는 함수
 * @param key 쿠키 키
 * @param value 저장할 값
 */
export const setCookieData = (key: string, value: unknown): void => {
  try {
    Cookies.set(key, JSON.stringify(value), {
      expires: 1, // 1시간 후 만료
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });
  } catch (error) {
    console.warn("Failed to save to cookies:", error);
  }
};

/**
 * 쿠키에서 데이터를 가져오는 함수
 * @param key 쿠키 키
 * @returns 저장된 값 또는 null
 */
export const getCookieData = (key: string): unknown => {
  try {
    const value = Cookies.get(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

/**
 * 쿠키에서 데이터를 삭제하는 함수
 * @param key 쿠키 키
 */
export const removeCookieData = (key: string): void => {
  try {
    Cookies.remove(key);
  } catch (error) {
    console.warn("Failed to remove from cookies:", error);
  }
};
