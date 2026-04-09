import { NextResponse } from "next/server";
import { rafflesMockData } from "@/mocks";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  const { id } = await params;

  const raffle = rafflesMockData.find((r) => r.id.toString() === id.toString());

  await new Promise((r) => setTimeout(r, 400));

  if (!raffle) {
    return NextResponse.json(
      { message: "Çekiliş bulunamadı", searchedId: id },
      { status: 404 }
    );
  }

  return NextResponse.json(raffle);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();    
    await new Promise((r) => setTimeout(r, 1000));
    console.log(`[API PUT] Güncellenen ID: ${id}`);
    console.log("[API PUT] Gelen Body:", body);

    return NextResponse.json({
      success: true,
      message: "Çekiliş başarıyla güncellendi.",
    }, { status: 200 });

  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({
      success: false,
      message: "Güncelleme sırasında bir hata oluştu.",
    }, { status: 500 });
  }
}