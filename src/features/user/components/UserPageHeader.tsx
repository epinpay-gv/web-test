interface UserPageHeaderprops {
    title: String
}

export default function UserPageHeader({title}: UserPageHeaderprops) {
    return(
         <h1 className="text-(--text-body) text-[16px] pb-2 border-b border-gray-300">
       {title}
      </h1>
    )
}