import { NextResponse } from "next/server";
import { mockStreamerApplicationPageData } from "@/mocks/streamers.mock";
import { StreamerApplicationPayload } from "@/features/streamers/streamers.types";


export async function GET() {
  try {
    return NextResponse.json(
      {
        metadata: {
          title: "Yayıncı Başvuru Formu | Epinpay",
          metaDescription: "Yayıncı olmak ve Epinpay ailesine katılmak için başvurunuzu yapın.",
        },
        data: mockStreamerApplicationPageData,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Sayfa verileri yüklenirken hata oluştu." },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const body: StreamerApplicationPayload = await request.json();
   if (!body.full_name || !body.email || !body.phone || !body.stream_url) {
  return NextResponse.json(
    { success: false, message: "Lütfen zorunlu alanları doldurunuz." },
    { status: 400 }
  );
}
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json(
      {
        success: true,
        message: "Başvurunuz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.",
        applicationId: `APP-${Date.now()}`,
      },
      { status: 201 } 
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Sunucu hatası: Başvuru işlemi şu an gerçekleştirilemiyor." },
      { status: 500 }
    );
  }
}