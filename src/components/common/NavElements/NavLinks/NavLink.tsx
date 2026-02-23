import Link from "next/link";

type NavLinkTypes = "default" | "withBg" | "withContainer";
type NavLinkTitleTypes = "default" | "header" | "highlight";
type NavLinkHelperTypes = "default" | "green" ;

const CONTAINER_CLASSES: Record<NavLinkTypes, string> = {
  default: "text-xs",
  withBg: "flex p-2 gap-2.5 rounded-lg hover:bg-(--bg-neutral-secondary-medium)",
  withContainer: "gap-4 p-2 bg-(--bg-neutral-primary-soft) border border-(--border-default) rounded-xl shadow-xs"
};

const TITLE_CLASSES: Record<NavLinkTitleTypes, string> = {
  default: "text-sm font-base group-hover:text-(--text-fg-brand)",
  header: "text-base font-semibold text-(--text-heading) group-hover:text-(--text-fg-brand)",
  highlight: "text-sm font-base leading-5 text-(--text-fg-brand)"
};

const HELPER_CLASSES: Record<NavLinkHelperTypes, string> = {
  default: "text-sm font-base text-(--text-body) group-hover:text-(--text-fg-brand)",
  green: "text-sm font-semibold text-(--text-fg-success-strong) group-hover:text-(--text-fg-brand)",
};


interface NavLinkProps {
  type?: NavLinkTypes;
  titleType?: NavLinkTitleTypes;
  className?: string;
  title: string;
  helper?: string;
  helperType?: NavLinkHelperTypes;
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
  helperType = "default",
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
      <div className={`flex  gap-1 w-61 ${type === "withContainer" ? "justify-between" : "flex-col"}`}>
        <p className={`${TITLE_CLASSES[titleType]}`}>{title}</p>
        {helper && <p className={`${HELPER_CLASSES[helperType]}`}>{helper}</p>}
      </div>
      {leftIcon}
    </Link>
  );
}
