/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const frameType = searchParams.get("frameType") ?? "";
  const imageBase64 = searchParams.get("imageBase64") ?? "";
  const imageScale = searchParams.get("imageScale") ?? "";
  const imageVertical = searchParams.get("imageVertical") ?? "";
  const imageHorizontal = searchParams.get("imageHorizontal") ?? "";
  const carType = searchParams.get("carType") ?? "";
  const posterTitle = searchParams.get("posterTitle") ?? "";

  if (!frameType || !imageScale || !imageVertical || !imageHorizontal || !carType || !posterTitle) {
    return new NextResponse("Please provide all required parameters.", { status: 400 });
  }

  const host =
    process.env.NODE_ENV === "production" ? "https://kia-heritage-event-front.vercel.app" : "http://localhost:3000";

  // Prepend http:// if missing
  const inputUrl = `${host}/test/preview?frameType=${frameType}&imageBase64=${imageBase64}&imageScale=${imageScale}&imageVertical=${imageVertical}&imageHorizontal=${imageHorizontal}&carType=${carType}&posterTitle=${posterTitle}`;

  // Validate the URL is a valid HTTP/HTTPS URL
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(inputUrl);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return new NextResponse("URL must start with http:// or https://", {
        status: 400
      });
    }
  } catch {
    return new NextResponse("Invalid URL provided.", { status: 400 });
  }

  let browser;
  try {
    const isVercel = !!process.env.VERCEL_ENV;
    let puppeteer: any,
      launchOptions: any = {
        headless: true
      };

    if (isVercel) {
      const chromium = (await import("@sparticuz/chromium")).default;
      puppeteer = await import("puppeteer-core");
      launchOptions = {
        ...launchOptions,
        args: chromium.args,
        executablePath: await chromium.executablePath()
      };
    } else {
      puppeteer = await import("puppeteer");
    }

    browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    await page.goto(parsedUrl.toString(), { waitUntil: "networkidle2" });
    const screenshot = await page.screenshot({ type: "png", fullPage: true });
    // base64 형식으로 변환
    const base64Screenshot = `data:image/png;base64,${screenshot.toString("base64")}`;
    return new NextResponse(base64Screenshot, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'inline; filename="screenshot.png"',
        "Content-Length": base64Screenshot.length.toString()
      }
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("An error occurred while generating the screenshot.", { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
