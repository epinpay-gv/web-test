import { NextRequest } from "next/server";

export function proxyHeaders(req: NextRequest, contentType = false): Record<string, string> {
  const headers: Record<string, string> = {};
  if (contentType) headers["Content-Type"] = "application/json";

  const cookie = req.headers.get("cookie") ?? "";
  if (cookie) headers["cookie"] = cookie;

  // httpOnly cookie'den accessToken çekip Authorization header olarak ilet
  const accessToken = cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="))
    ?.split("=")[1];
  if (accessToken) headers["authorization"] = `Bearer ${accessToken}`;

  return headers;
}
