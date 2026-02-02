import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";

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
        <div className="flex justify-between">
          <span><h1>{data.title}</h1> listeleniyor. <span>{data.totalProductAmount} ürün</span></span>
          <div>Sırala</div>
        </div>
        <Breadcrumb
          data={{
            currentPage: "products",
            currentPageLink: "/products",
          }}
        />
      </div>
    </>
  );
}
