interface SectionHeaderProps {
  title: string
  actionLabel?: string
  onActionClick?: () => void
}

export default function SectionHeader({
  title,
  actionLabel,
  onActionClick,
}: SectionHeaderProps) {
  return (
    <div className="flex gap-2 text-sm font-medium mt-6">
      <p>{title}</p>

      {actionLabel && (
        <button
          onClick={onActionClick}
          className="text-(--text-fg-brand)"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
