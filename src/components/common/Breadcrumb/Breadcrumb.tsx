import { Home, AngleRight } from "flowbite-react-icons/outline";
import Link from "next/link";

interface BreadcrumbProps {
  data: {
    currentPage: string;
    currentPageLink: string;
  };
}

export default function Breadcrumb({ data }: BreadcrumbProps) {
  return (
    <>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Home />
        <span>Ana Sayfa</span>
        <AngleRight />
        <Link href={data.currentPageLink}>{data.currentPage}</Link>
      </div>
    </>
  );
}
