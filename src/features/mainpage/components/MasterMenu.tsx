import MasterMenuLeft from "./MasterMenuLeft";
import MasterMenuRight from "./MasterMenuRight";
import Section from "@/components/layout/Section/Section";


export default function MasterMenu() {
  return (
    <Section>
      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-12 lg:mt-15 pb-18">
        <MasterMenuLeft />
        <MasterMenuRight />
      </div>

      {/* Mobile */}
      <div className="md:hidden pb-4">
        <MasterMenuLeft section="top" />
        <MasterMenuRight />
        <MasterMenuLeft section="bottom" />
      </div>
    </Section>
  );
}
