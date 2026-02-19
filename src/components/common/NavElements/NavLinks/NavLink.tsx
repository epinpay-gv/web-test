import Link from "next/link";

type NavLinkTypes = "default" | "withBg";
type NavLinkTitleTypes = "default" | "header";

const CONTAINER_CLASSES: Record<NavLinkTypes, string> = {
  default: "text-xs",
  withBg: "flex p-2 gap-2.5 rounded-lg hover:bg-(--bg-neutral-secondary-medium)",
};

const TITLE_CLASSES: Record<NavLinkTitleTypes, string> = {
  default: "text-sm font-base group-hover:text-(--text-fg-brand)",
  header: "text-base font-semibold text-(--text-heading) group-hover:text-(--text-fg-brand)",
};

interface NavLinkProps {
  type?: NavLinkTypes;
  titleType?: NavLinkTitleTypes;
  className?: string;
  title: string;
  helper?: string;
  rigthIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  withIconCircle?: boolean;
  url: string;
}

export default function NavLink({
  type = "default",
  titleType = "default",
  className,
  title,
  helper,
  rigthIcon,
  leftIcon,
  withIconCircle = false,
  url,
}: NavLinkProps) {
  return (
    <Link
      className={`${className} group flex items-center rounded-lg hover:text-(--text-fg-brand) ${CONTAINER_CLASSES[type]} `}
      href={url}
    >
      {rigthIcon &&
        (withIconCircle ? (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-(--bg-neutral-primary-medium) border border-(--border-default-medium)">
            {rigthIcon}
          </div>
        ) : (
          rigthIcon
        ))}
      <div className="flex flex-col gap-1 w-61">
        <p className={`${TITLE_CLASSES[titleType]}`}>{title}</p>
        <p className="text-sm font-base text-(--text-body) group-hover:text-(--text-fg-brand)">{helper}</p>
      </div>
      {leftIcon}
    </Link>
  );
}
