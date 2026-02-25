import { SidebarItemData } from "./sidebar.types";
import { SidebarItem } from "./components/SidebarItem";

interface SidebarProps{
  data: SidebarItemData[];
}
export const Sidebar = ({data} : SidebarProps) => {
  return (
    <aside >
      {data.map((item) => (
        <SidebarItem key={item.url} data={item} />
      ))}
    </aside>
  )
}