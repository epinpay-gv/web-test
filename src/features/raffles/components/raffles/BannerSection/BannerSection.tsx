interface BannerSectionProps {
  left: React.ReactNode;
  right: React.ReactNode;
  accentColor?: string;
}

export default function BannerSection({
  left,
  right,
  accentColor = "#8B0836",
}: BannerSectionProps) {
  return (
    <section
      className="w-full relative overflow-hidden py-10 md:py-20 px-4 md:px-10"
      style={{ backgroundColor: accentColor }}
    >
      <div className="mx-auto w-full flex flex-col gap-6 md:flex-row justify-between items-center max-w-5xl">
        <div className="z-1 w-full md:w-auto">{left}</div>
        <div className="z-1">{right}</div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `conic-gradient(from 178.04deg at 73.09% 35.2%, rgba(255, 255, 255, 0.85) 0deg, rgba(0, 0, 0, 0.61) 54.38deg, rgba(255, 255, 255, 0.8) 100.21deg, #000000 148.57deg, rgba(255, 255, 255, 0.83) 197.54deg, rgba(0, 0, 0, 0.96) 238.5deg, rgba(255, 255, 255, 0.69) 280deg, #000000 328.07deg, rgba(255, 255, 255, 0.85) 360deg)`,
          mixBlendMode: "screen",
          opacity: 0.6,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url('/raffles-page/banner-with-light-texture.webp')`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          mixBlendMode: "soft-light",
          opacity: 0.3,
        }}
      />
    </section>
  );
}
