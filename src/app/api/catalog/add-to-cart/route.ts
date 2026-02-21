import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Fake validation
    if (!body.productId || !body.offerId) {
      return NextResponse.json(
        { message: "Eksik veri" },
        { status: 400 }
      );
    }

    // Fake delay 
    await new Promise((res) => setTimeout(res, 500));

    return NextResponse.json({
      success: true,
      message: "Ürün sepete eklendi",
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}