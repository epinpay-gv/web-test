'use client'

export default function GameCard({ coins, price }) {
  return (
    <div className="rounded-xl bg-(--bg-neutral-primary-soft) border border-(--border-default) p-3 flex items-center justify-between gap-[24px]">
      <span className="text-sm font-medium text-(--text-heading)">
        {coins}
      </span>

      <span className="text-sm font-semibold text-(--text-fg-success-strong)">
        {price}
      </span>
    </div>
  )
}
