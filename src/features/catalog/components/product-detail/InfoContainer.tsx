interface InfoContainerProps {
  title?: string;
  titleIcon?: React.ReactNode;
  titleColor?: string;
  children: React.ReactNode;
}

export default function InfoContainer({
  title,
  titleIcon,
  titleColor,
  children,
}: InfoContainerProps) {
  return (
    <div className="card-container py-6 px-4 flex flex-col gap-4">
      <div className={`flex gap-2 items-center ${titleColor}`}>
        {titleIcon && <div>{titleIcon}</div>}
        {title && (
          <p className="text-sm font-semibold">
            {title}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
