"use client";

export interface StatusStateProps {
  image?: string;
  title?: string;
  titleClassName?: string;
  description?: React.ReactNode;
  descriptionNode?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export default function StatusState({
  image,
  title,
  titleClassName,
  description,
  descriptionNode,
  actions,
  className,
}: StatusStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className ?? ""}`}>
      {image && (
        <img
          src={image}
          alt={title ?? ""}
          className="w-40 h-40 object-contain mb-6"
        />
      )}

      <h2 className={`text-xl font-semibold mb-2 ${titleClassName ?? ""}`}>
        {title}
      </h2>

      {(description || descriptionNode) && (
        <p className="text-sm text-(--text-body-subtle) max-w-md mb-6">
          {descriptionNode ?? description}
        </p>
      )}

      {actions && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}