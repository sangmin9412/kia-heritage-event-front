import { Option } from "@/features/poster/types";
import { z } from "zod";

export const genderTypes = ["M", "F"] as const;

export enum genderTypesEnum {
  M = "M",
  F = "F"
}

export const genderOptions: Option<(typeof genderTypes)[number]>[] = [
  { label: "남자", value: genderTypesEnum.M },
  { label: "여자", value: genderTypesEnum.F }
];

export const hasDriverLicenseOptions: Option[] = [
  { label: "예", value: "true" },
  { label: "아니오", value: "false" }
];

const baseSchema = {
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
  phone: z.string().min(1, { message: "전화번호를 입력해주세요." }),
  email: z.email({ message: "이메일 형식에 맞지 않습니다." }),
  gender: z.enum(genderTypes, { message: "성별을 선택해주세요." }),
  birthDate: z.string().min(1, "생년월일을 입력해주세요"),
  birthYear: z.string().min(1, "출생년도를 선택해주세요"),
  birthMonth: z.string().min(1, "출생월을 선택해주세요"),
  birthDay: z.string().min(1, "출생일을 선택해주세요"),
  isDriverLicense: z.enum(["true", "false"], { message: "자동차운전면허증 소유 여부를 선택해주세요." }),
  isOldKiaCar: z.enum(["true", "false"], { message: "과거 기아차 소유 여부를 선택해주세요." }),
  oldKiaCar: z.string().optional(),
  isCurrentKiaCar: z.enum(["true", "false"], { message: "현재 기아차 소유 여부를 선택해주세요." }),
  currentKiaCar: z.string().optional(),
  currentNonKiaCar: z.string().optional(),
  agreeTerms: z.boolean().refine(val => val, { message: "이벤트 참여 약관에 동의해주세요." }),
  agreePrivacy: z.boolean().refine(val => val, { message: "개인정보 수집 / 이용 동의에 체크해주세요." })
};

export const eventEnterFormSchema = z
  .object(baseSchema)
  .refine(
    data => {
      // isOldKiaCar가 "true"인 경우 oldKiaCar 필드가 필수
      if (data.isOldKiaCar === "true") {
        return data.oldKiaCar && data.oldKiaCar.trim().length > 0;
      }
      return true;
    },
    {
      message: "과거 소유했던 기아차 모델명을 입력해주세요.",
      path: ["oldKiaCar"]
    }
  )
  .refine(
    data => {
      // isCurrentKiaCar가 "true"인 경우 currentKiaCar 필드가 필수
      if (data.isCurrentKiaCar === "true") {
        return data.currentKiaCar && data.currentKiaCar.trim().length > 0;
      }
      return true;
    },
    {
      message: "현재 소유하고 있는 기아차 모델명을 입력해주세요.",
      path: ["currentKiaCar"]
    }
  )
  .refine(
    data => {
      // isCurrentKiaCar가 "false"인 경우 currentNonKiaCar 필드가 필수
      if (data.isCurrentKiaCar === "false") {
        return data.currentNonKiaCar && data.currentNonKiaCar.trim().length > 0;
      }
      return true;
    },
    {
      message: "현재 소유하고 있는 차량의 모델명을 입력해주세요.",
      path: ["currentNonKiaCar"]
    }
  );

export type eventEnterFormSchemaType = z.infer<typeof eventEnterFormSchema>;
