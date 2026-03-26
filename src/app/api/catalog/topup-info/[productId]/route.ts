import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ productId: string }> }
) {
  const { productId } = await context.params;

  await new Promise((r) => setTimeout(r, 300));

  const id = Number(productId);

  console.log("Fetching topup fields for product:", id);

  return NextResponse.json({
    data: [
      { id: 1, label: "Server Id", value: "" },
      { id: 2, label: "Client Id", value: "" },
    ],
  });
}