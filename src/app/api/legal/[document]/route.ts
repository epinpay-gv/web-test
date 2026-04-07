import { NextResponse } from "next/server";
import { mockMetadata, legalMockData } from "@/mocks";

type Params = {
  document: string;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<Params> },
) {
  const { document } = await params;

  const legalData = legalMockData.find((doc) => doc.type === document);

  // FAKE LATENCY
  await new Promise((r) => setTimeout(r, 200));

  return NextResponse.json({
    metadata: mockMetadata.find((m) => m.pageId === 1),
    data: legalData,
  });
}
