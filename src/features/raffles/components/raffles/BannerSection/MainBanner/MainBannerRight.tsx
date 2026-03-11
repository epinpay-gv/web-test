/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

export default function MainBannerRight() {
  return (
    <div style={{ height: "400px" }}>
      <div className="absolute -bottom-10 -right-16 ">
        <img
          src="/raffles-page/main-banner-right-image.webp"
          alt="Main Banner Image"
          className="w-62 h-auto md:w-100 md:h-auto object-contain"
        />
      </div>
    </div>
  );
}
