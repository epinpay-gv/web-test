import Badge from "../Badges/Badge";

interface DescriptionTitleProps {
  title: string;
  description: string;
  badge?: boolean;
  badgeIcon?: React.ReactNode;
  badgeText?: string;
}

export default function DescriptionTitle({
  title,
  description,
  badge = false,
  badgeIcon,
  badgeText,
}: DescriptionTitleProps) {
  return (
    <div className="flex flex-col gap-2 max-h-19 overflow-hidden ">
      <div className="flex gap-2">
        <h2 className="text-xl font-semibold text-(--text-heading) leading-7">
          {title}
        </h2>
        {badge && (
          <Badge
            icon={badgeIcon}
            text={badgeText}
            theme="success"
            size="sm"
            className="py-0.5 px-1 gap-1 font-(--font-base)"
          />
        )}
      </div>
      <p className="text-sm font-(--font-base) leading-[150%] text-(--text-body)">
        {description}
      </p>
    </div>
  );
}
