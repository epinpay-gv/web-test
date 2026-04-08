import { mockStreamerApplicationPageData } from "@/mocks/streamer-application.mock";

export default function ApplicationHero() {
  return (
    <div
      className="w-full"
      style={{
        backgroundColor: "#8B0836",
        backgroundImage: `radial-gradient(89.91% 315.77% at 12.94% 70.24%, 
          rgba(0, 0, 0, 0.56) 19.23%, 
          rgba(255, 255, 255, 0.448) 99.99%, 
          rgba(0, 0, 0, 0.3416) 100%
        )`,
        backgroundBlendMode: "screen",
      }}
    >

      <div className="max-w-5xl mx-auto py-6">
        <h1 className="text-3xl font-bold text-white">
          {mockStreamerApplicationPageData.hero.title}
        </h1>
      </div>
    </div>
  );
}