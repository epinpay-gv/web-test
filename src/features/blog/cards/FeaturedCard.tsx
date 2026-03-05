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
        className="w-125 h-63 rounded-xs object-cover"
      />
      <h2 className="w-125 font-semibold text-[20px] text-(--text-heading)">
        {data.title}
      </h2>
      <p className="w-125 text-[14px] text-(--text-body)">
        {data.description}
      </p>
    </div>
  );
}