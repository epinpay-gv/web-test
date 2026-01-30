
// import { ComponentType } from "react"

// interface FeatureItemProps {
//   icon: ComponentType<{ size?: number; className?: string }>
//   title: string
// }

// export default function FeatureItem({ icon: Icon, title }: FeatureItemProps) {
//   return (
//     <div className="flex items-center gap-1 mb-4">
//       <Icon size={20} className="text-fg-brand" />
//       <p className="text-xs text-(--text-body)">{title}</p>
//     </div>
//   )
// }



import { ComponentType } from "react"

interface FeatureItemProps {
  icon: ComponentType<{ size?: number; className?: string }>
  title: string
}

export default function FeatureItem({ icon: Icon, title }: FeatureItemProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon size={20} className="text-fg-brand" />
      <p className="text-xs text-(--text-body)">{title}</p>
    </div>
  )
}
