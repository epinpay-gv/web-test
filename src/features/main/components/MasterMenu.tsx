import MasterMenuLeft from "./MasterMenuLeft";
import MasterMenuRight from "./MasterMenuRight"
import NavigationTabs from "@/components/common/NavLinks/NavTabs/NavigationTabs"

export default function MasterMenu() {
  return (
    <div className="h-auto md:h-109 lg:mt-20 md:grid md:grid-cols-2 md:gap-12">
      {/* Desktop/tablet layout (unchanged) */}
      <div className="hidden md:block">
        <MasterMenuLeft />
      </div>
      <div className="hidden md:block">
        <MasterMenuRight />
      </div>

      {/* Mobile layout order:
          1) heading
          2) feature items
          3) game category cards
          4) section header
          5) product cards
      */}
      <div className="md:hidden">
        <MasterMenuLeft section="top" />
      </div>
      <div className="md:hidden">
        <MasterMenuRight />
      </div>
      <div className="md:hidden">
        <MasterMenuLeft section="bottom" />
      </div>
      <div>
        <NavigationTabs/>
      </div>
    </div>
  )
}