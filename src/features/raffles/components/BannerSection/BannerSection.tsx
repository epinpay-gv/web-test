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
  "with-light": "p-6",
};

interface BannerSectionProps {
  background: BackgroundType;
  left: React.ReactNode;
  right: React.ReactNode;
}
export default function BannerSection({
  background,
  left,
  right,
}: BannerSectionProps) {
  return (
    <section className="w-full relative overflow-hidden" style={BACKGROUND_STYLES[background]}>
      {background === "brand" && (
        <Image
          src="/raffles-page/banner-brand-texture.svg"
          alt=""
          aria-hidden="true"
          width={485}
          height={340}
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        />
      )}
      <div className="relative z-10 mx-auto w-full flex justify-between items-center max-w-5xl py-6">
        <div>{left}</div>
        <div>{right}</div>
      </div>
    </section>
  );
}
