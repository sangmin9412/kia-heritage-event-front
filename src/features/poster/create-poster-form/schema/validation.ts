import { Option } from "@/features/poster/types";
import { z } from "zod";

const frameTypes = ["horizontal", "vertical"] as const;
const carTypes = [
  "car_type_01",
  "car_type_02",
  "car_type_03",
  "car_type_04",
  "car_type_05",
  "car_type_06",
  "car_type_07",
  "car_type_08"
] as const;

export const frameOptions: Option<(typeof frameTypes)[number]>[] = [
  { label: "가로형", value: "horizontal" },
  { label: "세로형", value: "vertical" }
];

export const carOptions: Option<(typeof carTypes)[number]>[] = [
  { label: "모델명1", value: "car_type_01", image: "/images/create/car/car_type_01.png" },
  { label: "모델명2", value: "car_type_02", image: "/images/create/car/car_type_02.png" },
  { label: "모델명3", value: "car_type_03", image: "/images/create/car/car_type_03.png" },
  { label: "모델명4", value: "car_type_04", image: "/images/create/car/car_type_04.png" },
  { label: "모델명5", value: "car_type_05", image: "/images/create/car/car_type_05.png" },
  { label: "모델명6", value: "car_type_06", image: "/images/create/car/car_type_06.png" },
  { label: "모델명7", value: "car_type_07", image: "/images/create/car/car_type_07.png" },
  { label: "모델명8", value: "car_type_08", image: "/images/create/car/car_type_08.png" }
];

const baseSchema = {
  frameType: z.enum(frameTypes, { message: "프레임 타입을 선택해주세요." }),
  imageBase64: z.string().min(1, { message: "이미지 파일을 선택해주세요." }),
  imageScale: z
    .number()
    .min(0, { message: "이미지 크기를 선택해주세요." })
    .max(2, { message: "이미지 크기를 선택해주세요." }),
  imageVertical: z
    .number()
    .min(-100, { message: "이미지 위치를 선택해주세요." })
    .max(100, { message: "이미지 위치를 선택해주세요." }),
  imageHorizontal: z
    .number()
    .min(-100, { message: "이미지 위치를 선택해주세요." })
    .max(100, { message: "이미지 위치를 선택해주세요." }),
  carType: z.enum([...carTypes, ""], { message: "차량 타입을 선택해주세요." }),
  posterTitle: z.string().min(1, { message: "포스터 제목을 입력해주세요." }),
  instagramName: z.string().min(1, { message: "인스타그램 계정명을 입력해주세요." })
};

export const createPosterFormSchema = z.object(baseSchema);

export type createPosterFormSchemaType = z.infer<typeof createPosterFormSchema>;
