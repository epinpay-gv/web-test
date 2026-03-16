import { NextResponse } from "next/server";
import { userRafflesMockData } from "@/mocks";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const order = userRafflesMockData.find((o) => o.id === id);

  if (!order) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: order });
}