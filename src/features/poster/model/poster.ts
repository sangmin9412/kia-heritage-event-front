import { frameCodesEnum } from "@/features/poster/create-poster-form";
import { genderTypesEnum } from "@/features/poster/event-enter-form/schema/validation";

// 포스터 생성
export type RequestPosterCreate = FormData;
// export interface RequestPosterCreate {
//   data: {
//     isThirdPartyCollect: boolean;
//     gender: keyof typeof genderTypesEnum;
//     carCode: string;
//     position: {
//       offsetX: number;
//       offsetY: number;
//       scale: number;
//     };
//     name: string;
//     isPrivacyCollect: boolean;
//     instagramId: string;
//     birthDate: string;
//     phone: string;
//     isDriverLicense: boolean;
//     story: string;
//     title: string;
//     frameCode: keyof typeof frameCodesEnum;
//     email: string;
//   };
//   uploadFile: File;
// }

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
      gender: "M" | "F";
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
      gender: "M" | "F";
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
