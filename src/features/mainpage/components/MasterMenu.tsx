import MasterMenuLeft from "./MasterMenuLeft";
import MasterMenuRight from "./MasterMenuRight";
import Section from "@/components/layout/Section/Section";
// import NavigationTabs from "@/components/common/NavLinks/NavTabs/NavTabs";
// import { useState } from "react";

// import {
//   Home,
//   AdjustmentsHorizontal,
//   UserCircle,
//   Download,
//   UserHeadset,
//   CheckCircle,
// } from "flowbite-react-icons/outline";

// import NavItems from "@/components/common/NavLinks/NavTabs/NavItems";

// const TIME_RANGES = [
//   { label: "7 Gün", value: "1h" },
//   { label: "10Gün", value: "24h" },
//   { label: "12Gün", value: "1w" },
// ];

// const MENU_TABS = [
//   { label: "Home", value: "home", icon: Home },
//   { label: "Settings", value: "settings", icon: AdjustmentsHorizontal },
//   { label: "My account", value: "accounts", icon: UserCircle },
//   { label: "Downloads", value: "downloads", icon: Download },
//   { label: "Supports", value: "supports", icon: UserHeadset },
// ];

export default function MasterMenu() {
  // const [activeTab, setActiveTab] = useState("");
  // const [range, setRange] = useState("");

  return (
    <Section>
      <div className="h-auto md:h-100 lg:mt-15 md:grid md:grid-cols-2 md:gap-12 pb-3">
        <div className="hidden md:block">
          <MasterMenuLeft />
        </div>
        <div className="hidden md:block">
          <MasterMenuRight />
        </div>

        <div className="md:hidden">
          <MasterMenuLeft section="top" />
        </div>
        <div className="md:hidden">
          <MasterMenuRight />
        </div>
        <div className="md:hidden">
          <MasterMenuLeft section="bottom" />
        </div>
      </div>
      {/* <div>
       
            <NavItems
          label="Item 1"
          value="item1"
          icon={AdjustmentsHorizontal}
          isActive={false}
          onClick={() => {}}
          variant="bordered"
          size="base"
          iconPosition="left"
        />

        <NavigationTabs
          items={MENU_TABS}
          activeValue={activeTab}
          onChange={setActiveTab}
          variant="default"
          size="base"
        />
    
      </div> */}
    </Section>
  );
}
