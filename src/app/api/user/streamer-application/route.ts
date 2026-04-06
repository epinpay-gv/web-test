import { NextResponse } from "next/server";
import { mockStreamerApplications } from "@/mocks/user/streamer-application.mock";

export async function GET() {
  return NextResponse.json({
    data: mockStreamerApplications,
  });
}