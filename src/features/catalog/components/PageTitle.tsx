import { Button } from "@/components/common";
import { Sort } from "flowbite-react-icons/outline";

interface PageTitleProps {
  data: {
    title: string;
    totalProductAmount: number;
  };
  changeOrder?: (order: string) => void;
}

export default function PageTitle({ data, changeOrder }: PageTitleProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm md:text-xl flex items-center gap-2">
        <h1>{data.title} listeleniyor</h1>
        <p className="text-(--text-body)">{data.totalProductAmount} ürün</p>
      </div>
      <div className="w-60 hidden md:block">
        <Button
          padding="sm"
          textSize="sm"
          variant="secondary"
          icon={<Sort />}
          text="Sırala (Artan Fiyat)"
        />
      </div>
    </div>
  );
}
