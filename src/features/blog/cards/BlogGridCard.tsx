import { BlogCard } from "../blog.types";

interface Props {
  data: BlogCard;
}

export default function BlogGridCard({ data }: Props) {
  return (
    <div className="flex flex-col gap-4 w-61 h-89.5 bg-(--bg-neutral-primary-soft) p-3 rounded-2xl">
      <div className="relative">
        <img
          src={data.thumbnail}
          alt={data.title}
          className="w-full h-45 object-cover rounded-2xl"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <p className="text-(--text-heading) font-semibold text-[14px] text-center px-2">
            {data.title}
          </p> */}
        </div>
      </div>

      <p className="text-(--text-heading) font-semibold text-[14px]">
        {data.title}
      </p>

      <p className="text-(--text-body) text-[12px]">
        {data.description}
      </p>
    </div>
  );
}