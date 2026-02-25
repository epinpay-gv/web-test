interface UserPageHeaderprops {
    title: String
}

export default function UserPageHeader({title}: UserPageHeaderprops) {
    return(
         <h1 className="text-(--text-body) text-[16px] border-b border-(--border-default)">
       {title}
      </h1>
    )
}