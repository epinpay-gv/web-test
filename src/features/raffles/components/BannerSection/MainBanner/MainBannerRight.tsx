import Image from "next/image";

export default function MainBannerRight() {
  return (
    <div className="flex flex-col gap-6 items-end justify-end h-full">
      <Image
        src="/raffles-page/main-banner-right-image.webp"
        alt="Main Banner Image"
        width={400}
        height={400}
        className="w-62 h-62 md:w-100 md:h-100 object-contain"
      />
    </div>
  );
}
