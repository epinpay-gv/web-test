import Image from "next/image";

interface PaymentProviderCardProps {
  image: string;
  imageAlt: string;
}

export default function PaymentProviderCard({
  image,
  imageAlt,
}: PaymentProviderCardProps) {
  return (
    <div className="p-1 bg-(--bg-neutral-primary-medium) rounded-xs h-5 w-auto">
      <Image
        src={image}
        alt={imageAlt}
        width={0}
        height={0}
        sizes="100px"
        className="h-3 w-auto object-contain"
      />
    </div>
  );
}
