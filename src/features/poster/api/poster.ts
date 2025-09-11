import {
  RequestPosterCreate,
  RequestPosterParticipation,
  RequestPosterStatus,
  ResponsePosterCreate,
  ResponsePosterParticipation,
  ResponsePosterStatus
} from "@/features/poster/model/poster";
import httpClient from "@/lib/http";
import axios from "axios";

// 참여 여부 조회
export const getParticipationStatus = async (payload: RequestPosterParticipation) => {
  return httpClient.post<ResponsePosterParticipation>("/api/posters/participants/duplicate", payload);
};

// 포스터 생성
export const createPoster = async (formData: RequestPosterCreate) => {
  return httpClient.post<ResponsePosterCreate>("/api/posters", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

// 포스터 생성 상태 조회
export const getPosterStatus = async (payload: RequestPosterStatus) => {
  return httpClient.get<ResponsePosterStatus>(`/api/posters/${payload.posterId}`);
};

// 포스터 이미지 다운로드
export const getPosterImage = async (imageUrl: string) => {
  return axios.post("/api/poster", { imageUrl }).then(res => res.data);
};
