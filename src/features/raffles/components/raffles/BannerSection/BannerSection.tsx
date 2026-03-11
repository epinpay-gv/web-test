import Image from "next/image";

type BackgroundType = "brand" | "with-light";

const BACKGROUND_STYLES: Record<BackgroundType, React.CSSProperties> = {
  brand: {
    backgroundColor: "#FF8A4C",
    backgroundImage: `
      linear-gradient(263.8deg, #F9D697 0.55%, #FFE7DD 24.87%, rgba(191, 195, 210, 0) 89.38%, rgba(255, 219, 173, 0) 97.8%),
      url('/raffles-page/banner-brand-texture.svg')
    `,
    backgroundPosition: "left, right",
    backgroundRepeat: "no-repeat, no-repeat",
    backgroundSize: "100%, auto 100%",
  },
  "with-light": {},
};

const PADDING_STYLES: Record<BackgroundType, string> = {
  brand: "",
  "with-light": "py-20 px-10",
};

interface BannerSectionProps {
  background: BackgroundType;
  left: React.ReactNode;
  right: React.ReactNode;
  accentColor?: string;
  leftClass?: string;
  rightClass?: string;
}
export default function BannerSection({
  background,
  left,
  right,
  accentColor = "#8B0836",
  leftClass,
  rightClass,
}: BannerSectionProps) {
  return (
    <section
      className={`w-full relative overflow-hidden ${PADDING_STYLES[background]} md:py-10 `}
      style={{
        ...BACKGROUND_STYLES[background],
        ...(background === "with-light" && { backgroundColor: accentColor }),
      }}
    >
      {background === "with-light" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `conic-gradient(from 178.04deg at 73.09% 35.2%, rgba(255, 255, 255, 0.85) 0deg, rgba(0, 0, 0, 0.61) 54.38deg, rgba(255, 255, 255, 0.8) 100.21deg, #000000 148.57deg, rgba(255, 255, 255, 0.83) 197.54deg, rgba(0, 0, 0, 0.96) 238.5deg, rgba(255, 255, 255, 0.69) 280deg, #000000 328.07deg, rgba(255, 255, 255, 0.85) 360deg)`,
            mixBlendMode: "screen",
            opacity: 0.6,
          }}
        />
      )}

      {background === "with-light" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/raffles-page/banner-with-light-texture.webp')`,
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
            mixBlendMode: "soft-light",
            opacity: 0.3,
          }}
        />
      )}
      <div className="relative z-10 mx-auto w-full flex flex-col md:flex-row justify-between items-center max-w-5xl py-6">
        <div className={`${leftClass}`}>{left}</div>
        <div className={`${rightClass}`}>{right}</div>
      </div>
    </section>
  );
}
