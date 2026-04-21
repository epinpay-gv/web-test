interface UserPageHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export default function UserPageHeader({ title, children }: UserPageHeaderProps) {
  return (
    <div className="flex justify-between items-center border-b border-(--border-default) pb-3 mb-3">
      <h1 className="text-(--text-body) text-[16px]">
        {title}
      </h1>
      {children}
    </div>
  )
}