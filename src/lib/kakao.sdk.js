let kakaoSdkInstance = null;

export const kakaoSdk = () => {
  console.log(process.env.KAKAO_SDK_KEY);
  if (kakaoSdkInstance) {
    return kakaoSdkInstance;
  }

  if (typeof window !== "undefined" && window.hasOwnProperty("Kakao") && process.env.KAKAO_SDK_KEY) {
    kakaoSdkInstance = window.Kakao;
    kakaoSdkInstance.init(process.env.KAKAO_SDK_KEY);
    return kakaoSdkInstance;
  }

  return null;
};
