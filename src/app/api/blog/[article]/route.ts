import { NextResponse } from "next/server";
import { mockMetadata } from "@/mocks";
import { blogDetailMock, blogListMock } from "@/mocks/blogs.mock";

type Params = {
  article: string;
};

export async function GET(
  _request: Request,

  { params }: { params: Promise<Params> },
) {
  const { article } = await params;
  console.log("article receives request");

  // FAKE LATENCY
  await new Promise((r) => setTimeout(r, 200));

  return NextResponse.json({
    metadata: mockMetadata.find((m) => m.pageId === 6),
    data: { data: blogDetailMock, popular: blogListMock.blogs },
  });
}
