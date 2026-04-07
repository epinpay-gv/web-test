import { getStreamerDetail } from "@/features/streamers/streamers.service";
import StreamerClientPage from "./streamer-client";
import { notFound } from "next/navigation";

export default async function StreamerPage({
  params,
}: {
  params: Promise<{ locale: string; streamer: string; platform: string }>;
}) {
  const { streamer, platform } = await params;

  const res = await getStreamerDetail(platform, streamer);

  if (!res || !res.data) {
    return notFound();
  }

  return (
    <>
      {/* Page Content */}
      <StreamerClientPage data={res.data} isLoading={false} />
    </>
  );
}
