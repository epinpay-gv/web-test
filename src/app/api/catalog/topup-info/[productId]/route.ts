import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  await new Promise((r) => setTimeout(r, 300));

  const productId = Number(params.productId);

  console.log("Fetching topup fields for product:", productId);

  return NextResponse.json({
    data: [
      { id: 1, label: "Server Id", value: "" },
      { id: 2, label: "Client Id", value: "" },
    ],
  });
}
