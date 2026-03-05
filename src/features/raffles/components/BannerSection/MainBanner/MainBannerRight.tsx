import Image from "next/image";

export default function MainBannerRight() {
  return (
    <div className="flex flex-col gap-6">
      <Image
        src="/raffles-page/main-banner-right-image.webp"
        alt="Main Banner Image"
        width={300}
        height={300}
      />
    </div>
  );
}
