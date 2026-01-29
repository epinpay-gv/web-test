'use client'

interface ProductCardProps {
  title: string
  price: number
  currency?: 'TRY' | 'USD'
}

export default function ProductCard({
  title,
  price,
  currency = 'TRY',
}: ProductCardProps) {
  const formattedPrice =
    currency === 'TRY'
      ? `₺${price.toLocaleString('tr-TR')}`
      : `$${price.toLocaleString('en-US')}`

  return (
    <div className="rounded-xl bg-(--bg-neutral-primary-soft) border border-(--border-default) p-1 flex items-center justify-between gap-6 w-37.75 h-9.5">
      <span className="text-sm font-medium text-(--text-heading)">
        {title}
      </span>

      <span className="text-sm font-semibold text-(--text-fg-success-strong)">
        {formattedPrice}
      </span>
    </div>
  )
}
