import { RequestPosterParticipationStatus, ResponsePosterParticipationStatus } from "@/features/poster/model/poster";

// 참여 여부 조회
export const getParticipationStatus = async (payload: RequestPosterParticipationStatus) => {
  return new Promise<ResponsePosterParticipationStatus>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        isParticipated: false
      });
    }, 1000);
  });
};
