interface BaseCardProps {
  children: React.ReactNode
  hoverable?: boolean
  className?: string
  onClick?: () => void
}


export default function BaseCard({
  children,
  hoverable = true,
  className = '',
  onClick,
}: BaseCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-xl border border-(--border-default) transition
        ${hoverable ? 'hover:shadow-lg' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

