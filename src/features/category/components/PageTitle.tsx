import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import { Button } from "@/components/common/Button/Button";
import { Home } from "flowbite-react-icons/outline";

interface PageTitleProps {
  data: {
    title: string;
    totalProductAmount: number;
  };
  changeOrder: (order: string) => void;
}

export default function PageTitle({ data, changeOrder }: PageTitleProps) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xl flex items-center gap-2">
            <h1>{data.title}</h1> listeleniyor.{" "}
            <p className="text-body text-[14px] my-0">
              {data.totalProductAmount} ürün
            </p>
          </span>
          <div>Sırala (Artan Fiyat)</div>
          <Button
            padding="sm"
            textSize="sm"
            variant="secondary"
            icon={<Home />}
            className="block md:hidden"
            text="Sırala (Artan Fiyat)"
          />
        </div>
        <Breadcrumb
          data={{
            currentPage: "Ürünler",
            currentPageLink: "/products",
          }}
        />
      </div>
    </>
  );
}
