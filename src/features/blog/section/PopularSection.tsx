import { BlogCard } from "../blog.types";
import BlogGridCard from "../cards/BlogGridCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Props {
  data: BlogCard[];
}

export default function PopularSection({ data }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-(--text-heading) font-semibold text-[20px] mb-6">
        Popüler Haberler
      </h2>

    <Carousel opts={{ align: "start" }} className="w-full">
  <CarouselContent className="-ml-4">
    {data.map((item) => (
     <CarouselItem key={item.id} className="pl-4 basis-[calc(100%/2..1)] lg:basis-[calc(100%/3.7)]">
        <BlogGridCard data={item} />
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>
    </div>
  );
}