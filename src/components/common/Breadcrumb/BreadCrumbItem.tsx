import { BreadcrumbItemType } from "@/types/types";
import { AngleRight } from "flowbite-react-icons/outline";
import Link from "next/link";

interface BreadCrumbItemProps {
  data: BreadcrumbItemType;
  isLast: boolean;
}

export default function BreadCrumbItem({ data, isLast }: BreadCrumbItemProps) {
  return (
    <div className="flex items-center gap-1.5 text-xs md:text-sm text-(--font-base)">
      <Link
        href={data.url}
        className="flex items-center gap-1.5 hover:text-(--text-fg-brand)"
      >
        {data.icon && <span>{data.icon}</span>}
        <span>{data.name}</span>
      </Link>

      {!isLast && <AngleRight size={14} />}
    </div>
  );
}
