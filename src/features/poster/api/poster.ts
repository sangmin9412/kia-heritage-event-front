import {
  RequestPosterCreate,
  RequestPosterParticipation,
  RequestPosterScreenshot,
  ResponsePosterCreate,
  ResponsePosterParticipation
} from "@/features/poster/model/poster";
import httpClient from "@/lib/http";

// 참여 여부 조회
export const getParticipationStatus = async (payload: RequestPosterParticipation) => {
  return new Promise<ResponsePosterParticipation>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        isParticipated: false
      });
    }, 1000);
  });
};

export const createPoster = async (payload: RequestPosterCreate) => {
  return new Promise<ResponsePosterCreate>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        posterId: "1234567890"
      });
    }, 3000);
  });
};

export const getPosterScreenshot = async (payload: RequestPosterScreenshot) => {
  const params = new URLSearchParams();
  Object.entries(payload).forEach(([key, value]) => {
    params.append(key, String(value));
  });
  return httpClient.get(`/api/screenshot?${params.toString()}`);
};
