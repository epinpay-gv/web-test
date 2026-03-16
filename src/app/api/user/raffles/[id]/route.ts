import { NextResponse } from "next/server";
import { userRafflesMockData } from "@/mocks";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const raffle = userRafflesMockData.find((i) => i.id === id);

    if (!id || id === 'undefined') {
    return Response.json(
      { status: 400, message: 'Invalid raffle id' },
      { status: 400 }
    );
  }
  if (!raffle) {
    return NextResponse.json(
      { error: "raffle not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: raffle });
}