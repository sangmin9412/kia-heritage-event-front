import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);
    const base64 = buffer.toString("base64");
    const mimeType = response.headers["content-type"] || "image/jpeg";
    const dataUrl = `data:${mimeType};base64,${base64}`;

    return NextResponse.json({ data: dataUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "포스터 이미지 조회 중 오류가 발생했습니다." }, { status: 500 });
  }
}
