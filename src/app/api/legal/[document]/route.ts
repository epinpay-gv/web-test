import { NextResponse } from "next/server";
import { getLegalDocument } from "@/features/legal/legal.service";

type Params = {
  document: string;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<Params> },
) {
  const { document } = await params;

  try {
    const response = await getLegalDocument(document);
    
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Veri getirilemedi" },
      { status: 500 }
    );
  }
}
