import { Option } from "@/features/poster/types";
import { z } from "zod";

const frameCodes = ["HORIZONTAL", "VERTICAL"] as const;
const carCodes = ["CAR01", "CAR02", "CAR03", "CAR04", "CAR05", "CAR06", "CAR07", "CAR08"] as const;

export enum frameCodesEnum {
  HORIZONTAL = "HORIZONTAL",
  VERTICAL = "VERTICAL"
}

export enum carCodesEnum {
  CAR01 = "CAR01",
  CAR02 = "CAR02",
  CAR03 = "CAR03",
  CAR04 = "CAR04",
  CAR05 = "CAR05",
  CAR06 = "CAR06",
  CAR07 = "CAR07",
  CAR08 = "CAR08"
}

export const frameOptions: Option<frameCodesEnum>[] = [
  { label: "가로형", value: frameCodesEnum.HORIZONTAL },
  { label: "세로형", value: frameCodesEnum.VERTICAL }
];

export const carOptions: Option<carCodesEnum>[] = [
  { label: "모델명1", value: carCodesEnum.CAR01, image: "/images/create/car/CAR01.png" },
  { label: "모델명2", value: carCodesEnum.CAR02, image: "/images/create/car/CAR02.png" },
  { label: "모델명3", value: carCodesEnum.CAR03, image: "/images/create/car/CAR03.png" },
  { label: "모델명4", value: carCodesEnum.CAR04, image: "/images/create/car/CAR04.png" },
  { label: "모델명5", value: carCodesEnum.CAR05, image: "/images/create/car/CAR05.png" },
  { label: "모델명6", value: carCodesEnum.CAR06, image: "/images/create/car/CAR06.png" },
  { label: "모델명7", value: carCodesEnum.CAR07, image: "/images/create/car/CAR07.png" },
  { label: "모델명8", value: carCodesEnum.CAR08, image: "/images/create/car/CAR08.png" }
];

const baseSchema = {
  frameCode: z.enum(frameCodes, { message: "프레임 타입을 선택해주세요." }),
  imageBase64: z.string().min(1, { message: "이미지 파일을 선택해주세요." }),
  imageScale: z
    .number()
    .min(0.5, { message: "이미지 크기를 선택해주세요." })
    .max(2.5, { message: "이미지 크기를 선택해주세요." }),
  imageVertical: z
    .number()
    .min(-100, { message: "이미지 위치를 선택해주세요." })
    .max(100, { message: "이미지 위치를 선택해주세요." }),
  imageHorizontal: z
    .number()
    .min(-100, { message: "이미지 위치를 선택해주세요." })
    .max(100, { message: "이미지 위치를 선택해주세요." }),
  carCode: z.enum(carCodes, { message: "차량 타입을 선택해주세요." }),
  title: z
    .string()
    .min(1, { message: "포스터 제목을 입력해주세요." })
    .max(16, { message: "포스터 제목을 16자 이내로 입력해주세요." }),
  instagramId: z
    .string()
    .min(1, { message: "인스타그램 계정명을 입력해주세요." })
    .max(30, { message: "인스타그램 계정명을 30자 이내로 입력해주세요." })
};

export const createPosterFormSchema = z.object(baseSchema);

export type createPosterFormSchemaType = z.infer<typeof createPosterFormSchema>;
