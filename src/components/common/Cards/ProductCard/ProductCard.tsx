import Image from "next/image";
import { Button } from "../../Button/Button";
import "./productCard.css";
import { DesktopPc } from "flowbite-react-icons/outline";

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
      <div className="product-card-container p-3 gap-1 flex flex-col justify-between md:w-56 md:h-92.5">
        {/* Fav button */}
        {/* Image */}
        <div className="relative w-full aspect-square">
          <Image
            src={props.img}
            alt={props.img_alt}
            width={200}
            height={200}
            className="object-contain rounded mx-auto"
          />
        </div>

        <div className="space-y-2">
          {/* text */}
          <p className="max-w-50 truncate">{props.title}</p>

          {/* product info : with stock*/}
          {props.price ? (
            <>
              <div className="text-xs flex gap-2 items-center">
                <DesktopPc size={20} />
                <span className="text-body"> {props.location}</span>
              </div>

              <p className="gap-2 flex items-center justify-end font-medium">
                <span className="text-body text-xs line-through">
                  {props.fakePrice}
                </span>
                {props.discountRate && (
                  <span className="text-fg-brand-strong text-xs">
                    - {props.discountRate}
                  </span>
                )}
                <span className="text-fg-success-strong">{props.price}</span>
              </p>
              {/* buttons */}
              <div className="flex  justify-between">
                <Button
                  padding="sm"
                  textSize="sm"
                  variant="ghost"
                  text="Sepete Ekle"
                />
                <Button
                  padding="sm"
                  textSize="sm"
                  variant="brand"
                  text="Hemen Al"
                />
              </div>
            </>
          ) : (
            <>
              <div className="text-xs flex gap-2 items-center">
                <DesktopPc size={20} />
                <span className="text-body"> {props.location}</span>
              </div>

              <p className="gap-2 flex items-center justify-end font-medium">
                <span className="text-body text-xs line-through">
                  {props.fakePrice}
                </span>
                {props.discountRate && (
                  <span className="text-fg-brand-strong text-xs">
                    - {props.discountRate}
                  </span>
                )}
                <span className="text-fg-danger-strong">Stokta Yok</span>
              </p>
              {/* buttons */}
              <div className="flex w-full justify-between">
                <Button
                  padding="sm"
                  textSize="sm"
                  variant="secondary"
                  text="Gelince Haber Ver"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
