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
    return NextResponse.json({ error: "Failed to get poster image" }, { status: 500 });
  }
}
