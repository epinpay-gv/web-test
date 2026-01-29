import MasterMenuLeft from "./MasterMenuLeft";
import MasterMenuRight from "./MasterMenuRight"
export default function MasterMenu() {
  return (
    <div className="lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:h-109">
      <MasterMenuLeft/>
      <MasterMenuRight/>
    </div>
  )
}