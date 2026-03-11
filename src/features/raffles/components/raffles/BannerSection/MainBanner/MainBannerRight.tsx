import Image from "next/image";

export default function MainBannerRight() {
  return (
    <>
      <div className="relative flex flex-col items-end justify-end h-full md:min-h-72.5">
        <Image
          src="/raffles-page/main-banner-right-image.webp"
          alt="Main Banner Image"
          width={400}
          height={400}
          className="w-62 h-62 md:w-100 md:h-100 object-contain bottom-0 right-0"
        />
      </div>
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          width: 582,
          height: 400,
        }}
      >
        <Image
          src="/raffles-page/banner-brand-texture.svg"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover"
          style={{
            opacity: 0.4,
            mixBlendMode: "plus-lighter",
          }}
        />
      </div>
    </>
  );
}
