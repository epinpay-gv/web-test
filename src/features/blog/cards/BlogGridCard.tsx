import { BlogCard } from "../blog.types";

interface Props {
  data: BlogCard;
}

export default function BlogGridCard({ data }: Props) {
  return (
    <div className="flex flex-col gap-4 w-[170px] h-[354px] lg:w-61 lg:h-89.5 bg-(--bg-neutral-primary-soft) p-3 rounded-2xl">
      <div className="relative">
        <img
          src={data.thumbnail}
          alt={data.title}
          className="w-full h-[120px] lg:h-45 object-cover rounded-2xl"
        />
      </div>

      <p className="text-(--text-heading) font-semibold text-[14px] line-clamp-2">
        {data.title}
      </p>

      <p className="text-(--text-body) text-[12px] line-clamp-4">
        {data.description}
      </p>
    </div>
  );
}