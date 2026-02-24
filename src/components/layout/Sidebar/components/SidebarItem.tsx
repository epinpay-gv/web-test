import Link from "next/link"
import { SidebarItemData } from "../sidebar.types";

interface SidebarItemProps{
    data: SidebarItemData;
}
export const SidebarItem = ({data} : SidebarItemProps) => {

  return (
    <Link href={""} >
     
    </Link>
  )
}