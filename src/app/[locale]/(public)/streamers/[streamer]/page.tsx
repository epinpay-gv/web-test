export default async function StreamerPage({
  params,
}: {
  params: Promise<{ locale: string; streamer: string }>;
}) {
  const { locale, streamer } = await params;

  return (
    <>
      {" "}
      <h2
        className="text-3xl font-bold leading-[150%] inline-block bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(98.1deg, #FFFFFF 55.9%, #BBF451 88.69%)",
        }}
      >
        Şimdi yayında
      </h2>
      {streamer}
    </>
  );
}
