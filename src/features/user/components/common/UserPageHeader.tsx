interface UserPageHeaderProps {
  title: string
}

export default function UserPageHeader({ title }: UserPageHeaderProps) {
  return (
    <h1 className="text-(--text-body) text-[16px] border-b border-(--border-default) pb-3 mb-3">
      {title}
    </h1>
  )
}