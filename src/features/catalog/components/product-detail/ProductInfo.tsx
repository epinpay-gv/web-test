"use client";
import Image from "next/image";
import { Product } from "@/types/types";
import { Badge } from "@/components/common";

interface ProductInfoProps {
  data: Product;
}

export default function ProductInfo({ data }: ProductInfoProps) {
  return (
    <div className="flex gap-4">
      <Image
        src={data.translation.imgUrl}
        alt={data.translation.imgAlt}
        width={224}
        height={224}
        className="rounded-lg"
      />
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Badge text={data.type} theme="success" />
          <h1 className="font-semibold text-xl text-(--text-heading)">
            {data.translation.name}
          </h1>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="flex gap-2 col-span-2">points</div>
          <div className="flex gap-2">platform</div>
          <div className="flex gap-2">region</div>
        </div>
      </div>
    </div>
  );
}
