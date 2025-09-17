import { carCodesEnum, frameCodesEnum } from "@/features/poster/create-poster-form";
import { genderTypesEnum } from "@/features/poster/event-enter-form/schema/validation";

// 포스터 생성
export type RequestPosterCreate = FormData;

// 포스터 생성 응답
export interface ResponsePosterCreate {
  status: string;
  code: number;
  message: string;
  data: {
    posterId: number;
    title: string;
    instagramId: string;
    story: string;
    status: "DONE" | "PENDING" | "FAIL";
    participant: {
      participantId: number;
      name: string;
      phone: string;
      email: string;
      gender: keyof typeof genderTypesEnum;
      birthDate: string;
      isDriverLicense: boolean;
      isPrivacyCollect: boolean;
      isThirdPartyCollect: boolean;
    };
    posterFile: {
      fileId: number;
      fileName: string;
      fileFullName: string;
      fileUrl: string;
      type: string;
      createdAt: string;
    };
  };
}

// 포스터 참여 중복 조회
export interface RequestPosterParticipation {
  phone: string;
}

// 포스터 참여 중복 조회 응답
export interface ResponsePosterParticipation {
  status: string;
  code: number;
  data: {
    posterId: number | null;
  };
  message: string;
}

// 포스터 생성 상태 조회
export interface RequestPosterStatus {
  posterId: number | null;
}

// 포스터 생성 상태 조회 응답
export interface ResponsePosterStatus {
  status: string;
  code: number;
  message: string;
  data: {
    posterId: number;
    title: string;
    instagramId: string;
    story: string;
    status: "DONE" | "PENDING" | "FAIL";
    participant: {
      participantId: number;
      name: string;
      phone: string;
      email: string;
      gender: keyof typeof genderTypesEnum;
      birthDate: string;
      isDriverLicense: boolean;
      isPrivacyCollect: boolean;
      isThirdPartyCollect: boolean;
    };
    posterFile: {
      fileId: number;
      fileName: string;
      fileFullName: string;
      fileUrl: string;
      type: string;
      createdAt: string;
    };
  };
}

// 포스터 정보 저장
export type RequestPosterFormSave = {
  name: string;
  gender: keyof typeof genderTypesEnum;
  phone: string;
  email: string;
  birthDate: string;
  isThirdPartyCollect: boolean;
  isPrivacyCollect: boolean;
  isDriverLicense?: boolean;
  title: string;
  frameCode: keyof typeof frameCodesEnum;
  carCode: keyof typeof carCodesEnum;
  imageBase64: string;
  position: {
    offsetX: number;
    offsetY: number;
    scale: number;
  };
  instagramId: string;
  story: string;
};

export type ResponsePosterFormSave = {
  message: string;
  status: string;
  success: boolean;
  data: RequestPosterFormSave;
};

// 포스터 정보 조회
export type ResponsePosterFormGet = {
  message: string;
  status: string;
  success: boolean;
  data: RequestPosterFormSave;
};

// 포스터 정보 삭제
export type ResponsePosterFormDelete = {
  message: string;
  status: string;
  success: boolean;
  data: null;
};
