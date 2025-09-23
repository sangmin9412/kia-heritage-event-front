import { getSession } from "@/lib-server/session";
import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "poster-form";

type PosterForm = {
  name: string;
  gender: string;
  phone: string;
  email: string;
  birthDate: string;
  isThirdPartyCollect: boolean;
  isPrivacyCollect: boolean;
  isDriverLicense?: boolean;
  isOldKiaCar?: boolean;
  oldKiaCar?: string;
  isCurrentKiaCar?: boolean;
  currentKiaCar?: string;
  currentNonKiaCar?: string;
  title: string;
  frameCode: string;
  carCode: string;
  imageBase64: string;
  position: {
    offsetX: number;
    offsetY: number;
    scale: number;
  };
  instagramId: string;
  story: string;
};

const posterFormDefault: PosterForm = {
  name: "",
  gender: "",
  phone: "",
  email: "",
  birthDate: "",
  isThirdPartyCollect: false,
  isPrivacyCollect: false,
  isDriverLicense: undefined,
  isOldKiaCar: undefined,
  oldKiaCar: "",
  isCurrentKiaCar: undefined,
  currentKiaCar: "",
  currentNonKiaCar: "",
  title: "",
  frameCode: "HORIZONTAL",
  carCode: "CAR01",
  imageBase64: "",
  position: {
    offsetX: 0,
    offsetY: 0,
    scale: 1.5
  },
  instagramId: "",
  story: ""
};

export async function POST(request: NextRequest) {
  try {
    const body: Partial<PosterForm> = await request.json();

    // 세션 가져오기
    const session = await getSession<PosterForm>(COOKIE_NAME);

    Object.entries(body).forEach(([key, value]) => {
      if (value !== undefined) {
        session[key as keyof PosterForm] = (value as never) || posterFormDefault[key as keyof PosterForm];
      }
    });

    // 세션 저장
    await session.save();

    return NextResponse.json({
      message: "사용자 정보가 성공적으로 저장되었습니다.",
      status: 200,
      success: true,
      data: {
        ...session
      }
    });
  } catch (error) {
    console.error("Save user error:", error);
    const session = await getSession<PosterForm>(COOKIE_NAME);
    await session.destroy();
    return NextResponse.json({ error: "서버 오류가 발생했습니다.", data: session }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession<PosterForm>(COOKIE_NAME);

    const data = {
      ...posterFormDefault,
      ...session
    };

    return NextResponse.json({
      message: "사용자 정보가 성공적으로 조회되었습니다.",
      status: 200,
      success: true,
      data
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다.", data: null }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession<PosterForm>(COOKIE_NAME);
    await session.destroy();
    return NextResponse.json({
      message: "사용자 정보가 성공적으로 삭제되었습니다.",
      status: 200,
      success: true,
      data: null
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다.", data: null }, { status: 500 });
  }
}
