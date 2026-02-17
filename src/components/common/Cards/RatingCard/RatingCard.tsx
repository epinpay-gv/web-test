import { formatDateTR } from "@/lib/utils";
import { Comment } from "@/types/types";
import { Star } from "flowbite-react-icons/outline";

interface RatingCardProps {
  comment: Comment;
}

export default function RatingCard({ comment }: RatingCardProps) {
  const rating = Number(comment.rate);

  return (
    <div className="card-container p-6 flex flex-col gap-4 w-72.5 h-49.25 text-(--text-body) text-sm">
      <p>
        <span className="text-(--text-heading) font-semibold">
          {comment.name} {comment.surname}
        </span>
        
        {formatDateTR(comment.createdAt)}
      </p>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={20}
            className={
              index < rating
                ? "text-(--text-fg-lime) fill-current"
                : "text-(--text-muted)"
            }
          />
        ))}
        <span className="ml-2">{rating}</span>
      </div>
      <p className="h-10">{comment.comment}</p>
      <p className="text-white">{comment.store_name}</p>
    </div>
  );
}
