type BackgroundType = "brand" | "with-light";

const BACKGROUND_TYPE_CLASSES: Record<BackgroundType, string> = {
  brand: "text-xs",
  "with-light": "text-xs md:text-sm",
};

interface BannerSectionProps {
  background: BackgroundType;
  left: React.ReactNode;
  right: React.ReactNode;
}
export default function BannerSection({ background, left, right}: BannerSectionProps) {
  return (
    <section
      className={`w-full ${BACKGROUND_TYPE_CLASSES[background]}`}
    >
      <div className="mx-auto w-full grid grid-cols-2 max-w-5xl p-6">
        <div>{left}</div>
        <div>{right}</div>
      </div>
    </section>
  );
}
