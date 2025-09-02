import {
  RequestPosterCreate,
  RequestPosterParticipation,
  ResponsePosterCreate,
  ResponsePosterParticipation
} from "@/features/poster/model/poster";

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
