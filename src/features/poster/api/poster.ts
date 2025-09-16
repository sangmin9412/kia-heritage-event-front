import {
  RequestPosterCreate,
  RequestPosterParticipation,
  RequestPosterFormSave,
  RequestPosterStatus,
  ResponsePosterCreate,
  ResponsePosterParticipation,
  ResponsePosterFormSave,
  ResponsePosterStatus,
  ResponsePosterFormGet,
  ResponsePosterFormDelete
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
  return axios.post(`${process.env.NEXT_PUBLIC_URL}/api/poster`, { imageUrl }).then(res => res.data);
};

// 포스터 정보 저장
export const savePosterForm = async (payload: Partial<RequestPosterFormSave>) => {
  return axios
    .post<ResponsePosterFormSave>(`${process.env.NEXT_PUBLIC_URL}/api/poster/form`, payload)
    .then(res => res.data);
};

// 포스터 정보 조회
export const getPosterForm = async () => {
  return axios.get<ResponsePosterFormGet>(`${process.env.NEXT_PUBLIC_URL}/api/poster/form`).then(res => res.data);
};

// 포스터 정보 삭제
export const deletePosterForm = async () => {
  return axios.delete<ResponsePosterFormDelete>(`${process.env.NEXT_PUBLIC_URL}/api/poster/form`).then(res => res.data);
};
