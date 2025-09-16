import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function getSession<T extends object>(cookieName: string) {
  const session = await getIronSession<T>(await cookies(), {
    password: process.env.SESSION_SECRET || "kia_heritage_event_session_secret_key_1234567890",
    cookieName: cookieName,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 1 // 1일
    }
  });

  return session;
}
