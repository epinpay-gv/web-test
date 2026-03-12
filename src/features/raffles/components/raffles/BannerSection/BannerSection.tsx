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
      className="w-full relative overflow-hidden py-10 md:py-20 px-6 md:px-10"
      style={{ backgroundColor: accentColor }}
    >
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

      <div className="z-20 mx-auto w-full flex flex-col md:flex-row justify-between items-center max-w-5xl">
        <div>{left}</div>
        <div>{right}</div>
      </div>
    </section>
  );
}
