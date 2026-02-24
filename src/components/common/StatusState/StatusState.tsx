"use client";

export interface StatusStateProps {
  image?: string;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export default function StatusState({
  image,
  title,
  description,
  actions,
  className,
}: StatusStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className ?? ""}`}
    >
      {image && (
        <img
          src={image}
          alt=""
          className="w-40 h-40 object-contain mb-6"
        />
      )}

      <h2 className="text-xl font-semibold mb-2">
        {title}
      </h2>

      {description && (
        <p className="text-sm text-(--text-body-subtle) max-w-md mb-6">
          {description}
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