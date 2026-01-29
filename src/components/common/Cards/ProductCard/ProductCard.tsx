import Image from "next/image";
import { Button } from "../../Button/Button";

interface ProductCardProps {
  img: string;
  img_alt: string;
  title: string;
  location: string;
  price: string;
  discountRate?: string;
  fakePrice?: string;
}

export function ProductCard(props: ProductCardProps) {
  return (
    <>
      <div className="rounded-base gap-2 p-3 border border-[#1D303A] rounded-lg flex md:flex-col">
        {/* Fav button */}
        {/* Image */}
        <div className="relative w-full aspect-square">
          <Image
            src={props.img}
            alt={props.img_alt}
            fill
            className="object-contain rounded"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>

        {/* text */}
        <div className="space-y-2">
          <p>{props.location}</p>
          <p>{props.title}</p>
          <p className="text-end">
            {props.fakePrice} {props.discountRate} {props.price}
          </p>
          <div className="flex gap-2">
            <Button padding="xs" variant="ghost" text="Sepete Ekle" />
            <Button padding="xs" variant="brand" text="Hemen Al"/>
          </div>
        </div>
        {/* buttons */}
      </div>
    </>
  );
}
