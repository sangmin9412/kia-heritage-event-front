import { Option } from "@/features/poster/types";
import { z } from "zod";

export const GenderTypes = ["male", "female"] as const;
export const DriverLicenseTypes = ["Y", "N"] as const;

export const GenderOptions: Option<(typeof GenderTypes)[number]>[] = [
  { label: "남자", value: "male" },
  { label: "여자", value: "female" }
];

export const hasDriverLicenseOptions: Option<(typeof DriverLicenseTypes)[number]>[] = [
  { label: "예", value: "Y" },
  { label: "아니오", value: "N" }
];

const baseSchema = {
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
  phone: z.string().min(1, { message: "전화번호를 입력해주세요." }),
  email: z.email({ message: "이메일 형식에 맞지 않습니다." }),
  gender: z.enum(GenderTypes, { message: "성별을 선택해주세요." }),
  birthDate: z.string().min(1, "생년월일을 입력해주세요"),
  birthYear: z.string().min(1, "출생년도를 선택해주세요"),
  birthMonth: z.string().min(1, "출생월을 선택해주세요"),
  birthDay: z.string().min(1, "출생일을 선택해주세요"),
  hasDriverLicense: z.enum(DriverLicenseTypes, { message: "자동차운전면허증을 선택해주세요." }),
  agreeTerms: z.boolean().refine(val => val, { message: "이벤트 참여 약관에 동의해주세요." }),
  agreePrivacy: z.boolean().refine(val => val, { message: "개인정보 수집 / 이용 동의에 체크해주세요." })
};

export const eventEnterFormSchema = z.object(baseSchema);

export type eventEnterFormSchemaType = z.infer<typeof eventEnterFormSchema>;
