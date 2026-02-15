'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface NavCardProps {
  title: string
  backgroundImage: string
  href?: string
  onClick?: () => void
  variant?: 'centered' | 'corner'
  decorImage?: string
  className?: string
}

export function NavCard({
  title,
  backgroundImage,
  href,
  onClick,
  variant = 'centered',
  decorImage,
  className,
}: NavCardProps) {
  const content = (
    <div
      onClick={!href ? onClick : undefined}
      className={cn(
        'relative rounded-3xl overflow-hidden group',
        'transition-transform duration-300 transform-gpu',
        variant === 'centered' && 'hover:scale-105',
        !href && onClick && 'cursor-pointer',
        className
      )}
    >
      {/* Background */}
      <Image
        src={backgroundImage}
        alt={title}
        fill
        sizes="(max-width:768px) 100vw, 124px"
        className="object-cover"
      />

      {/* Inner shadow */}
      <div
        className="
          absolute inset-0 pointer-events-none opacity-0
          group-hover:opacity-100 transition-opacity duration-300
          shadow-[inset_0_0_40px_10px_rgba(255,255,255,0.6)]
        "
      />

      {/* Content */}
      {variant === 'centered' && (
        <span className="relative z-10 flex items-center justify-center h-full text-white font-semibold text-sm text-center px-2">
          {title}
        </span>
      )}

      {variant === 'corner' && (
        <>
          <span className="absolute top-3 left-3 z-10 text-white font-semibold text-sm">
            {title}
          </span>

          {decorImage && (
            <Image
              src={decorImage}
              alt=""
              width={48}
              height={48}
              className="
                absolute bottom-2 right-2 z-10
                transition-transform duration-300
                group-hover:-translate-y-1
              "
            />
          )}
        </>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    )
  }

  return content
}
