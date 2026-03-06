import { BlogCard } from "../blog.types";

interface Props {
  data: BlogCard;
}

export default function FeaturedCard({ data }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <img
        src={data.thumbnail}
        alt={data.title}
        className="w-[348px] h-[175px] lg:w-[500px] lg:h-[252px] rounded-xs object-cover"
      />
      <div className="w-[348px] lg:w-[500px]">
        <h2 className="font-semibold text-[20px] text-(--text-heading) leading-[150%]">
          {data.title}
        </h2>
        <p className="text-[14px] font-medium text-(--text-body) leading-[150%]">
          {data.description}
        </p>
      </div>
    </div>
  );
}